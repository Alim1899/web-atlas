import { GeoJSON } from "react-leaflet";
import useMaps from "../MapContext/useMaps";
import { useQueries } from "@tanstack/react-query";
import Spinner from "../../UI/Loader/Spinner";
import fetchGeoJson from "./Fetch";
import { pointToLayer, polygonStyle } from "./Styling";
export default function JsonProvider() {
  const { state } = useMaps();
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

  if (isLoading) return <Spinner />;

  const layersToDisplay = Object.entries(geoJsonData);

  return (
    <>
      {layersToDisplay.map((el) => {
        return el[1].type === "polygon" ? (
          <GeoJSON
            key={el[0]}
            data={el[1].features}
            style={(feature) => polygonStyle(feature, activeLayers, el[0])}
          />
        ) : el[1].type === "points" ? (
          <GeoJSON
            key={el[0]}
            data={el[1].features}
            pointToLayer={pointToLayer}
          />
        ) : (
          <GeoJSON key={el[0]} data={el[1].features} />
        );
      })}
    </>
  );
}
// const dataToSend = useMemo(() => {
//   const keys = activeLayers.map((el) => el.id);
//   const result = [];

//   keys.forEach((el) => {
//     const match = Object.entries(geoJsonData).find(([key]) => key === el);
//     if (match) {
//       const name = el;
//       const { features, type } = match[1];
//       if (type === "polygon") {
//         const layerData = features.map((feature) => {
//           const {
//             OBJECTID: id,
//             area,
//             layerDesc,
//             layerName,
//             length,
//             Hazard: hazard,
//           } = feature.properties;
//           return {
//             key: id,
//             name: layerName || false,
//             desc: layerDesc || false,
//             hazard: hazard || false,
//             area: area ? area.toFixed(2) : false,
//             length: length ? length.toFixed(2) : false,
//             color: polygonStyle(feature, activeLayers, name).fillColor,
//           };
//         });
//         result.push({ [name]: layerData });
//       }
//     }
//   });

//   return result;
// }, [geoJsonData, activeLayers]);
// console.log(dataToSend);
// // useEffect(() => {
// //   dispatch({ type: "SET_CHART", payload: dataToSend });
// // }, [dataToSend, dispatch]);

// //////////////////////////////////////
