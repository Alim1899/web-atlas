export const BarSvg = ({
  width,
  height,
  gap,
  barWidth,
  oldHeight,
  newHeight,
  oldColor,
  newColor,
  oldValue,
  newValue,
}) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* OLD bar */}
      <rect
        x={width / 2 - gap - barWidth}
        y={height - oldHeight}
        width={barWidth}
        height={oldHeight}
        fill={oldColor}
        rx="4"
      />

      {/* NEW bar */}
      <rect
        x={width / 2 + gap}
        y={height - newHeight}
        width={barWidth}
        height={newHeight}
        fill={newColor}
        rx="4"
      />

      {/* values */}
      <text
        x={width / 2 - gap - barWidth / 2}
        y={height - oldHeight - 6}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#abccba"
      >
        {oldValue}
      </text>

      <text
        x={width / 2 + gap + barWidth / 2}
        y={height - newHeight - 6}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#abccba"
      >
        {newValue}
      </text>
    </svg>
  );
};
