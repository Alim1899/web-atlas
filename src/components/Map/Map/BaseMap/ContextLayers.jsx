import { useMemo } from "react";
import { GeoJSON } from "react-leaflet";
import { mask } from "@turf/turf";
import useBaseData from "../../../Hooks/useBaseData";

export default function ContextLayers() {
  const { data: region } = useBaseData("region");
  const { data: rivers } = useBaseData("rivers");
  const { data: munis } = useBaseData("munis");

  const outside = useMemo(
    () => (region?.features?.[0] ? mask(region.features[0]) : null),
    [region],
  );

  return (
    <>
      {outside && (
        <GeoJSON
          data={outside}
          pane="context"
          interactive={false}
          style={{ stroke: false, fillColor: "#777271", fillOpacity: 0.4 }}
        />
      )}
      {rivers && (
        <GeoJSON
          data={rivers}
          pane="context"
          interactive={false}
          style={{ color: "#4a8fc4", weight: 1.2, opacity: 0.9 }}
        />
      )}
      {munis && (
        <GeoJSON
          data={munis}
          pane="context"
          interactive={false}
          style={{
            color: "#080101",
            weight: 1,
            fill: false,
          }}
        />
      )}
      {region && (
        <GeoJSON
          data={region}
          pane="context"
          interactive={false}
          style={{ color: "#333", weight: 2, fill: false }}
        />
      )}
    </>
  );
}
