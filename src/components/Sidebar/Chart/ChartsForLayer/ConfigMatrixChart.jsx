const dot = (color) => ({
  display: "inline-block",
  width: 12,
  height: 12,
  borderRadius: "50%",
  background: color,
  verticalAlign: "middle",
});

const cell = {
  padding: "5px 6px",
  borderBottom: "1px solid color-mix(in srgb, var(--light-text) 20%, transparent)",
  textAlign: "center",
  whiteSpace: "nowrap",
};

const ConfigMatrixChart = ({ data, chart }) => {
  const totals = data.map((d) => chart.items.reduce((s, it) => s + (d[it.field] ? 1 : 0), 0));

  return (
    <div style={{ overflowX: "auto", color: "var(--light-text)", fontSize: 12 }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={cell} />
            {data.map((d) => (
              <th key={d.name_ge} style={cell}>{d.name_ge}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.items.map((it) => (
            <tr key={it.field}>
              <td style={{ ...cell, textAlign: "left", whiteSpace: "normal", minWidth: 180 }}>
                <span style={{ ...dot(it.color), marginRight: 8 }} />
                {it.label}
              </td>
              {data.map((d) => (
                <td key={d.name_ge} style={cell}>
                  {d[it.field] ? <span style={dot(it.color)} /> : "–"}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td style={{ ...cell, textAlign: "left", fontWeight: 700 }}>სულ</td>
            {totals.map((t, i) => (
              <td key={data[i].name_ge} style={{ ...cell, fontWeight: 700 }}>
                {t} / {chart.items.length}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ConfigMatrixChart;