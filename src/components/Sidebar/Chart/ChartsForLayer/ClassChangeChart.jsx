// კლასის ცვლილება ორ წელს შორის: მუნიციპალიტეტი | 2012 | 2022 | ↑↓
const lower = (txt = "") => {
  const s = String(txt).trim();
  if (s.startsWith(">")) return parseFloat(s.slice(1));
  if (s.startsWith("<")) return parseFloat(s.slice(1)) - 1;
  return parseFloat(s);
};

const chip = (color) => ({
  display: "inline-block",
  minWidth: 74,
  padding: "2px 6px",
  borderRadius: 4,
  background: color,
  color: "#1d2733",
  fontWeight: 700,
  textAlign: "center",
  border: "1px solid rgba(0,0,0,0.12)",
});

const cell = {
  padding: "4px 6px",
  borderBottom: "1px solid color-mix(in srgb, var(--light-text) 20%, transparent)",
  whiteSpace: "nowrap",
};

export default function ClassChangeChart({ data, years, compact = false }) {
  const rows = Array.isArray(data) ? data[0] : null;
  if (!rows?.length) return null;

  const sorted = [...rows].sort((a, b) => lower(b.new?.rate) - lower(a.new?.rate));

  return (
    <div style={{ color: "var(--light-text)", fontSize: compact ? 11 : 13, overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ ...cell, textAlign: "left" }} />
            <th style={cell}>{years[0].label}</th>
            <th style={cell}>{years[1].label}</th>
            <th style={cell} />
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => {
            const a = lower(r.old?.rate);
            const b = lower(r.new?.rate);
            const arrow = b > a ? "▲" : b < a ? "▼" : "=";
            return (
              <tr key={r.name_ge}>
                <td style={{ ...cell, fontWeight: 600 }}>{r.name_ge}</td>
                <td style={{ ...cell, textAlign: "center" }}>
                  <span style={chip(r.old?.color?.first)}>{r.old?.rate}</span>
                </td>
                <td style={{ ...cell, textAlign: "center" }}>
                  <span style={chip(r.new?.color?.second)}>{r.new?.rate}</span>
                </td>
                <td style={{ ...cell, textAlign: "center", fontWeight: 700 }}>{arrow}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: 6, opacity: 0.75, fontSize: compact ? 10 : 11 }}>
        ‰ — ყოველ 1000 მცხოვრებზე · ▲ კლასი გაიზარდა, ▼ შემცირდა
      </div>
    </div>
  );
}