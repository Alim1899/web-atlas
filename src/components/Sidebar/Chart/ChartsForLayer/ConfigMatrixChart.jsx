const dot = (color, size = 12) => ({
  display: "inline-block",
  width: size,
  height: size,
  borderRadius: "50%",
  background: color,
  verticalAlign: "middle",
});

const cellStyle = (compact) => ({
  padding: compact ? "3px 2px" : "5px 6px",
  borderBottom: "1px solid color-mix(in srgb, var(--light-text) 20%, transparent)",
  textAlign: "center",
  whiteSpace: "nowrap",
});

// compact: ბეჭდვის რეჟიმი — მომსახურებების სახელების გარეშე (ისინი ლეგენდაშია);
// სტრიქონები — მუნიციპალიტეტები, სვეტები — ფერადი ნიშნები ლეგენდის რიგით
const CompactMatrix = ({ data, chart, totals }) => {
  const cell = cellStyle(true);
  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 11 }}>
      <thead>
        <tr>
          <th style={cell} />
          {chart.items.map((it) => (
            <th key={it.field} style={cell} title={it.label}>
              <span style={{ ...dot(it.color, 9), borderRadius: 2 }} />
            </th>
          ))}
          <th style={cell}>სულ</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={d.name_ge}>
            <td style={{ ...cell, textAlign: "left", fontWeight: 600 }}>{d.name_ge}</td>
            {chart.items.map((it) => (
              <td key={it.field} style={cell}>
                {d[it.field] ? <span style={dot(it.color, 10)} /> : "–"}
              </td>
            ))}
            <td style={{ ...cell, fontWeight: 700 }}>{totals[i]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ConfigMatrixChart = ({ data, chart, compact = false }) => {
  const totals = data.map((d) => chart.items.reduce((s, it) => s + (d[it.field] ? 1 : 0), 0));
  const cell = cellStyle(false);

  return (
    <div style={{ overflowX: "auto", color: "var(--light-text)", fontSize: 12 }}>
      {compact ? (
        <CompactMatrix data={data} chart={chart} totals={totals} />
      ) : (
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
      )}
    </div>
  );
};

export default ConfigMatrixChart;