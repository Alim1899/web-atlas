import { GeoJSON } from "react-leaflet";
import useMaps from "../MapContext/useMaps";
import { useQueries } from "@tanstack/react-query";
import Spinner from "../../UI/Loader/Spinner";
import fetchGeoJson from "./Fetch";
import { onEachPolygonFeature, pointToLayer, polygonStyle } from "./Styling";
import { useEffect } from "react";
export default function JsonProvider() {
  const { state, dispatch } = useMaps();
  const { activeLayers } = state;

  const layerIds = activeLayers.map((layer) => layer.id);
  const queries = useQueries({
    queries: layerIds.map((layer) => ({
      queryKey: ["geojson", layer],
      queryFn: () => fetchGeoJson(layer),
      staleTime: 60000,
      retry: 2,
    })),
  });

  const geoJsonData = Object.fromEntries(
    layerIds.map((layer, index) => [layer, queries[index]?.data || {}])
  );

  const isLoading = queries.some((query) => query?.isLoading);

  const { rockfall, geology, rivers, agroclimate } = geoJsonData;

  const rockfallLayer =
    activeLayers.some((layer) => layer.id === "rockfall") && rockfall?.features;
  const geologyLayer =
    activeLayers.some((layer) => layer.id === "geology") && geology?.features;
  const riversLayer = layerIds.includes("rivers") && rivers?.features;
  const agroclimateLayer =
    layerIds.includes("agroclimate") && agroclimate?.features;

  useEffect(() => {
    const dataToSend = [];
    if (agroclimateLayer) {
      const agroData = [];
      agroclimateLayer.forEach((feature) => {
        agroData.push({
          key: feature.properties.OBJECTID,
          label: feature.properties.zone,
          area: feature.properties.Shape_Area.toFixed(2),
          color: polygonStyle(feature, activeLayers, "agroclimate").fillColor,
        });
      });
      dataToSend.push({ agroclimate: agroData });
    }
    if (geologyLayer) {
      const geologyData = [];
      geologyLayer.forEach((feature) => {
        geologyData.push({
          key: feature.properties.OBJECTID,
          index: feature.properties.Index_,
          label: feature.properties.Geology,
          area: feature.properties.Shape_Area.toFixed(2),
          color: polygonStyle(feature, activeLayers, "geology").fillColor,
        });
      });
      dataToSend.push({ geology: geologyData });
    }
    dispatch({ type: "SET_CHART", payload: dataToSend });
  }, [agroclimateLayer, geologyLayer, activeLayers, dispatch]);
  if (isLoading) return <Spinner />;
  return (
    <>
      {rockfallLayer && (
        <GeoJSON data={rockfallLayer} pointToLayer={pointToLayer} />
      )}
      {geologyLayer && (
        <GeoJSON
          data={geologyLayer}
          style={(feature) => polygonStyle(feature, activeLayers, "geology")}
        />
      )}
      {riversLayer && <GeoJSON data={riversLayer} />}
      {agroclimateLayer && (
        <GeoJSON
          data={agroclimateLayer}
          style={(feature) =>
            polygonStyle(feature, activeLayers, "agroclimate")
          }
          onEachFeature={onEachPolygonFeature}
        />
      )}
    </>
  );
}
