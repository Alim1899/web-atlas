import { GeoJSON } from "react-leaflet";
import useMaps from "../MapContext/useMaps";
import { useQueries } from "@tanstack/react-query";
import Spinner from "../../UI/Loader/Spinner";
import { isEqual } from "lodash";
import fetchGeoJson from "./Fetch";
import { pointToLayer, polygonStyle } from "./Styling";
import { useEffect } from "react";
export default function JsonProvider() {
  const { state, dispatch } = useMaps();
  const { activeLayers, dataChart } = state;
  const layerIds = activeLayers.map((layer) => layer.id);

  const queries = useQueries({
    queries: layerIds.map((layer) => ({
      queryKey: ["geojson", layer],
      queryFn: () => fetchGeoJson("nature", layer),
      staleTime: 60000,
      retry: 2,
    })),
  });

  const geoJsonData = Object.fromEntries(
    layerIds.map((layer, index) => [layer, queries[index]?.data || {}])
  );
  const isLoading = queries.some((query) => query?.isLoading);

  const layersToDisplay = Object.entries(geoJsonData);
  console.log(layersToDisplay);
  useEffect(() => {
    if (layersToDisplay.length === 0) return;
    const result = isEqual(dataChart, layersToDisplay);
    if (result) return;
    dispatch({ type: "SET_DATA_CHART", payload: layersToDisplay });
  }, [layersToDisplay, dispatch, dataChart]);

  if (isLoading) return <Spinner />;
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
