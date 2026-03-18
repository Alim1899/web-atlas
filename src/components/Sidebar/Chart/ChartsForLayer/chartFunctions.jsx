import { BarSvg } from "./chartSymbols";
export function BarCompare({ oldValue, newValue, oldColor, newColor, size = 120 }) {
  const width = size;
  const height = size;
  const max = Math.max(oldValue, newValue);

  const barWidth = width * 0.25;
  const gap = width * 0.04;

  const oldHeight = (oldValue / max) * (height * 0.8);
  const newHeight = (newValue / max) * (height * 0.8);

 return (
    <BarSvg
      width={width}
      height={height}
      gap={gap}
      barWidth={barWidth}
      oldHeight={oldHeight}
      newHeight={newHeight}
      oldColor={oldColor}
      newColor={newColor}
      oldValue={oldValue}
      newValue={newValue}
    />
  );}