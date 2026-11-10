import { useEffect, useMemo } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import classes from "./PlaceLabels.module.css";
import useBaseData from "../../../../Hooks/useBaseData";

const TYPES = {
  ქალაქი: { rank: 0, cls: "city", charW: 9, h: 18 },
  დაბა: { rank: 1, cls: "town", charW: 7.5, h: 15 },
  სოფელი: { rank: 2, cls: "village", charW: 7, h: 14 },
};

// რომელ ზუმზე გამოჩნდეს
const minZoomFor = (type, size) => {
  if (type === "ქალაქი") return 8;
  if (type === "დაბა") return 11;
  if (size >= 2000) return 12;
  if (size >= 500) return 13;
  return 13;
};

export default function PlaceLabels() {
  const map = useMap();
  const { data } = useBaseData("places");

  const places = useMemo(() => {
    if (!data?.features) return [];
    return (
      data.features
        .filter((f) => TYPES[f.properties?.type_ge])
        .map((f) => {
          const { name_ge, type_ge, size = 0 } = f.properties;
          const [lng, lat] = f.geometry.coordinates;
          const t = TYPES[type_ge];
          return {
            name: name_ge,
            latlng: L.latLng(lat, lng),
            minZoom: minZoomFor(type_ge, size),
            rank: t.rank,
            size,
            cls: classes[t.cls],
            w: Math.round(name_ge.length * t.charW + 8),
            h: t.h,
          };
        })
     
        .sort((a, b) => a.rank - b.rank || b.size - a.size)
    );
  }, [data]);

  useEffect(() => {
    if (!places.length) return;
    const group = L.layerGroup().addTo(map);

    const update = () => {
      group.clearLayers();
      const z = map.getZoom();
      const bounds = map.getBounds().pad(0.1);
      const placed = [];

      for (const p of places) {
        if (z < p.minZoom || !bounds.contains(p.latlng)) continue;

        const { x, y } = map.latLngToContainerPoint(p.latlng);
        const box = [x - p.w / 2, y - p.h / 2, x + p.w / 2, y + p.h / 2];
        const overlaps = placed.some(
          (b) =>
            box[0] < b[2] && box[2] > b[0] && box[1] < b[3] && box[3] > b[1],
        );
        if (overlaps) continue;
        placed.push(box);

        L.marker(p.latlng, {
          pane: "placeLabels",
          interactive: false,
          keyboard: false,
          icon: L.divIcon({
            className: `${classes.label} ${p.cls}`,
            html: p.name,
            iconSize: [p.w, p.h],
            iconAnchor: [p.w / 2, p.h / 2],
          }),
        }).addTo(group);
      }
    };

    update();
    map.on("zoomend moveend", update);
    return () => {
      map.off("zoomend moveend", update);
      group.remove();
    };
  }, [map, places]);

  return null;
}
