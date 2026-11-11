import { ringsSvg } from "../../../Map/Map/Styling/StylesForLayer/Merital";

const cell = {
  padding: "4px 6px",
  borderBottom: "1px solid color-mix(in srgb, var(--light-text) 20%, transparent)",
  textAlign: "right",
  whiteSpace: "nowrap",
};

const dot = (color) => ({
  display: "inline-block",
  width: 10,
  height: 10,
  borderRadius: 2,
  background: color,
  marginRight: 6,
  verticalAlign: "middle",
});

// მუნიციპალიტეტების საშუალო (ჯამი / რაოდენობა), ‰
const average = (rows, year, label) =>
  Math.round(
    rows.reduce((s, r) => s + (Number(r[year]?.[label]) || 0), 0) / rows.length,
  );

// რეგიონის ჯამური ორმაგი რგოლი (შიდა 2002, გარე 2014) + ცვლილების ცხრილი
export default function MeritalChart({ data, layer, compact = false }) {
  const rows = Array.isArray(data) ? data[0] : null;
  if (!rows?.length) return null;

  const labels = Object.keys(rows[0].old).filter((k) => k !== "color");
  const colors = Object.values(rows[0].old.color || {});
  const oldV = labels.map((l) => average(rows, "old", l));
  const newV = labels.map((l) => average(rows, "new", l));
  const per = layer === "meritalwomen" ? "1000 ქალზე" : "1000 მამაკაცზე";
  const scale = compact ? 1.2 : 1.6;

  return (
    <div style={{ color: "var(--light-text)", fontSize: compact ? 11 : 13 }}>
      <div style={{ textAlign: "center", fontWeight: 700 }}>ქვემო ქართლის რეგიონი</div>

      <div
        style={{ display: "flex", justifyContent: "center" }}
        dangerouslySetInnerHTML={{ __html: ringsSvg(oldV, newV, colors, scale) }}
      />

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: "left" }} />
            <th style={cell}>2002</th>
            <th style={cell}>2014</th>
            <th style={cell}>ცვლილება</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, i) => {
            const diff = newV[i] - oldV[i];
            return (
              <tr key={label}>
                <td style={{ ...cell, textAlign: "left", whiteSpace: "normal" }}>
                  <span style={dot(colors[i])} />
                  {label}
                </td>
                <td style={cell}>{oldV[i]}</td>
                <td style={cell}>{newV[i]}</td>
                <td style={{ ...cell, fontWeight: 700 }}>{diff > 0 ? `+${diff}` : diff}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: 6, opacity: 0.75, fontSize: compact ? 10 : 11 }}>
        ‰ — {per} (15 წლის და უფროსი), მუნიციპალიტეტების საშუალო · შიდა რგოლი 2002, გარე 2014
      </div>
    </div>
  );
}