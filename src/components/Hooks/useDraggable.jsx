import { useRef } from "react";

const useDraggable = (ref) => {
  const positionRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const x = e.clientX - offsetRef.current.x;
    const y = e.clientY - offsetRef.current.y;

    positionRef.current = { x, y };
    ref.current.style.left = `${x}px`;
    ref.current.style.top = `${y}px`;
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleStart = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);

    offsetRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return {
    position: positionRef,
    handleStart,
  };
};

export default useDraggable;
