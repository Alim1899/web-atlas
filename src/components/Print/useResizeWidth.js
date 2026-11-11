import { useRef, useState } from "react";

// ბარათის სიგანის ხელით შეცვლა კიდეზე გადათრევით.
// side: "right" — სახელური მარჯვენა კიდეზეა (მარცხენა ბარათი),
//       "left"  — სახელური მარცხენა კიდეზეა (მარჯვენა ბარათი).
// width === null → ავტომატური სიგანე (CSS-იდან).
export default function useResizeWidth(side, min = 180, maxRatio = 0.6) {
  const ref = useRef(null);
  const [width, setWidth] = useState(null);

  const onPointerDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startW = ref.current.getBoundingClientRect().width;

    const move = (ev) => {
      const dx = ev.clientX - startX;
      const w = side === "right" ? startW + dx : startW - dx;
      setWidth(Math.min(Math.max(w, min), window.innerWidth * maxRatio));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  // ორჯერ დაჭერა → ავტომატურ სიგანეზე დაბრუნება
  const reset = () => setWidth(null);

  return { ref, width, onPointerDown, reset };
}