import L from "leaflet";
import { pointOnFeature } from "@turf/turf";

// რუკის სიმბოლოების (დიაგრამების) ხელით მითითებული ადგილები — [lng, lat].
// ეხება ყველა ფენას: წრიულები, რგოლები, სვეტები, ბორბლები.
// აქ ჩამოუთვლელი მუნიციპალიტეტები ავტომატურად შიდა წერტილზე ჯდება.
export const SYMBOL_POSITIONS = {
  რუსთავი: [44.95, 41.58],
  გარდაბანი: [45.1, 41.65],
  მარნეული: [44.9, 41.45],
};

// სიმბოლოს ადგილი: ხელით მითითებული ან მუნიციპალიტეტის შიდა წერტილი
export const symbolAnchor = (feature) => {
  const [lng, lat] = pointOnFeature(feature).geometry.coordinates;
  const custom = SYMBOL_POSITIONS[feature.properties?.name_ge];
  return {
    lat: custom ? custom[1] : lat,
    lng: custom ? custom[0] : lng,
    origin: [lat, lng], // მუნიციპალიტეტის წერტილი — გამყვანი ხაზის დასაწყისი
    moved: !!custom,
  };
};

// გამყვანი ხაზი მუნიციპალიტეტიდან გადატანილ სიმბოლომდე (მხოლოდ moved-ზე)
export function attachLeaderLine(layer, a) {
  if (!a.moved) return;

  const add = () => {
    if (!layer._map) return;
    layer.__leader?.remove();
    layer.__leader = L.polyline([a.origin, [a.lat, a.lng]], {
      color: "#333",
      weight: 1,
      interactive: false,
    }).addTo(layer._map);
  };

  if (layer._map) add();
  else layer.once("add", add);

  layer.once("remove", () => {
    layer.__leader?.remove();
    layer.__leader = null;
  });
}