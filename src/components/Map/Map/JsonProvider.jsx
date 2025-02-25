import { GeoJSON } from "react-leaflet";
import L from "leaflet";
import app from "../../firebaseConfig";
import useMaps from "../MapContext/useMaps";
import { useQueries } from "@tanstack/react-query";
import point from "../../../assets/map/point.svg";
import { getDatabase, get, ref } from "firebase/database";
import Spinner from "../../UI/Loader/Spinner";
const fetchGeoJson = async (layer) => {
  const db = getDatabase(app);
  try {
    const projectsRef = ref(db, `geojson/${layer}`);
    const snapshot = await get(projectsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(`No JSON data available for ${layer}`);
    }
  } catch (error) {
    console.error("Error fetching JSON", error);
  }
};

export default function JsonProvider() {
  const { state } = useMaps();
  const { activeLayers } = state;
  const queries = useQueries({
    queries: activeLayers.map((layer) => ({
      queryKey: ["geojson", layer],
      queryFn: () => fetchGeoJson(layer),
      staleTime: 60000,
      retry: 2,
    })),
  });

  const geoJsonData = activeLayers.reduce((acc, layer, index) => {
    acc[layer] = queries[index]?.data || {};
    return acc;
  }, {});

  const isLoading = queries.some((query) => query.isLoading);

  if (isLoading) return <Spinner />;

  return (
    <>
      {activeLayers.includes("rockfall") && geoJsonData.rockfall?.features && (
        <GeoJSON
          data={geoJsonData.rockfall.features}
          pointToLayer={pointToLayer}
        />
      )}

      {activeLayers.includes("geology") && geoJsonData.geology?.features && (
        <GeoJSON data={geoJsonData.geology.features} style={polygonStyle} />
      )}

      {activeLayers.includes("rivers") && geoJsonData.rivers?.features && (
        <GeoJSON data={geoJsonData.rivers.features} style={polygonStyle} />
      )}
      {activeLayers.includes("agroclimate") &&
        geoJsonData.agroclimate?.features && (
          <GeoJSON
            data={geoJsonData.agroclimate.features}
            style={polygonStyle}
          />
        )}
    </>
  );
}

// Define point marker styling
const pointToLayer = (feature, latlng) => {
  if (!latlng) console.log("error:", feature);
  return L.marker(latlng, {
    icon: L.icon({
      iconUrl: point,
      iconSize: [20, 20], // Set width & height (adjust as needed)
      iconAnchor: [10, 10], // Center icon
      popupAnchor: [0, -10], // Adjust popups
    }),
  });
};
function polygonStyle(feature, weight, opacity) {
  let color;
  if (feature.name === "geology") {
    let lyr = feature.properties.Index_;
    color =
      lyr === "K"
        ? "#feedde"
        : lyr === "Q"
        ? "#fdd0a2"
        : lyr === "yPz"
        ? "#fdae6b"
        : lyr === "J"
        ? "#fd8d3c"
        : lyr === "P"
        ? "#f16913"
        : lyr === "PR+Pz1"
        ? "#d94801"
        : lyr === "N"
        ? "#fff5eb"
        : "#8c2d04";
  } else if (feature.name === "agro") {
    const zone = feature.properties.zone;
    if (zone === "Cold") {
      color = "#ffffcc";
    } else if (zone === "mid_cold") {
      color = "#c2e699";
    } else if (zone === "moderate") {
      color = "#78c679";
    } else {
      color = "#238443";
    }
  }

  return {
    fillColor: color,
    weight: weight || 1,
    opacity: opacity || 1,
    color: "black",
    fillOpacity: 1,
  };
}
// const onEachPolygonFeature = (feature, layer) => {
//   if (feature.properties && feature.properties.Zone_) {
//     layer.bindPopup(`
//       <strong>Zone:</strong> ${feature.properties.Zone_}<br>
//       <strong>Type:</strong> ${feature.properties.Agro_tipe}
//       `);
//   }
// };
