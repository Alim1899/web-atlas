import classes from "./Chart.module.css";

function HalfCircle({ oldRate, newRate, oldColor, newColor, size = 120 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.48;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* OLD half */}
      <path
        d={`
          M ${cx} ${cy - r}
          A ${r} ${r} 0 0 1 ${cx} ${cy + r}
          L ${cx} ${cy}
          Z
        `}
        fill={oldColor}
      />

      {/* NEW half */}
      <path
        d={`
          M ${cx} ${cy + r}
          A ${r} ${r} 0 0 1 ${cx} ${cy - r}
          L ${cx} ${cy}
          Z
        `}
        fill={newColor}
      />

      {/* divider */}
      <line
        x1={cx}
        y1={cy - r}
        x2={cx}
        y2={cy + r}
        stroke="#fff"
        strokeWidth="2"
      />

      {/* OLD value */}
      <text
        x={cx - r * 0.55}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fontWeight="900"
        fill="#112233"
      >
        {oldRate}
      </text>

      {/* NEW value */}
      <text
        x={cx + r * 0.55}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fontWeight="900"
        fill="#112233"
      >
        {newRate}
      </text>
    </svg>
  );
}
function RateCircle({ rate, color, size = 120 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.48;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* circle */} <circle cx={cx} cy={cy} r={r} fill={color} />
      ```
      {/* value */}
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fontWeight="900"
        fill="#112233"
      >
        {rate}
      </text>
    </svg>
  );
}

export default function PopulationChart({ data, name }) {
  console.log(name);
  console.log(data[0]);

  if (!Array.isArray(data)) return null;
  return (
    <div className={classes.populationList}>
      {data[0].map((row, i) => (
        <div key={i} className={classes.populationItem}>
          <h4 className={classes.name}>{row.name_ge}</h4>
         
            {["birthrate", "deathrate"].includes(name) && (
               <div className={classes.item}>
            <span>2012</span>
              <HalfCircle
                oldRate={row.new.rate}
                newRate={row.old.rate}
                oldColor={row.old.color.second}
                newColor={row.new.color.first}
              />
              <span>2022</span>
          </div>
            )}
             {["pplchange"].includes(name) && (
              <RateCircle
                rate={row.rate}
                color={row.color}
              />
            )}
            
        </div>
      ))}
    </div>
  );
}
