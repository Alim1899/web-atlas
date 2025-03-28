import { useState, useRef, useEffect, useCallback } from "react";

const useDraggable = (chartRef) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const centerChart = useCallback(() => {
    if (chartRef.current) {
      const { offsetWidth, offsetHeight } = chartRef.current;
      setPosition({
        x: window.innerWidth / 2 - offsetWidth / 2,
        y: window.innerHeight / 2 - offsetHeight / 2,
      });
    }
  }, [chartRef]);

  useEffect(() => {
    centerChart();
    window.addEventListener("resize", centerChart);
    return () => {
      window.removeEventListener("resize", centerChart);
    };
  }, [centerChart]);

  const handleStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    offset.current = { x: clientX - position.x, y: clientY - position.y };
  };

  const handleMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setPosition({
        x: clientX - offset.current.x,
        y: clientY - offset.current.y,
      });
    },
    [isDragging]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const moveHandler = (e) => handleMove(e);
    const endHandler = () => handleEnd();

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", endHandler);
    window.addEventListener("touchmove", moveHandler);
    window.addEventListener("touchend", endHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", endHandler);
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", endHandler);
    };
  }, [isDragging, handleMove, handleEnd]);

  return { position, handleStart };
};

export default useDraggable;
