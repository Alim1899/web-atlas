// მუნიციპალიტეტები კლასების მიხედვით, ჯგუფებად (მაგ. დადებითი / უარყოფითი)
const chip = (color) => ({
  display: "inline-block",
  minWidth: 64,
  padding: "2px 8px",
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

export default function ClassListChart({ data, compact = false }) {
  const rows = Array.isArray(data) ? data[0] : null;
  if (!rows?.length) return null;

  // კლასის რიგით (index), შემდეგ სახელით
  const sorted = [...rows].sort(
    (a, b) => (a.index ?? 0) - (b.index ?? 0) || a.name_ge.localeCompare(b.name_ge, "ka"),
  );

  // ჯგუფები იმ რიგით, რომლითაც პირველად გვხვდება
  const groups = [];
  sorted.forEach((r) => {
    const key = r.group || "";
    let g = groups.find((x) => x.key === key);
    if (!g) groups.push((g = { key, rows: [] }));
    g.rows.push(r);
  });

  return (
    <div style={{ color: "var(--light-text)", fontSize: compact ? 11 : 13 }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          {groups.map((g) => [
            g.key && (
              <tr key={`h-${g.key}`}>
                <td colSpan={2} style={{ ...cell, fontWeight: 700, paddingTop: 10 }}>
                  {g.key}
                </td>
              </tr>
            ),
            ...g.rows.map((r) => (
              <tr key={r.name_ge}>
                <td style={{ ...cell, fontWeight: 600 }}>{r.name_ge}</td>
                <td style={{ ...cell, textAlign: "right" }}>
                  <span style={chip(r.color)}>{r.rate} %</span>
                </td>
              </tr>
            )),
          ])}
        </tbody>
      </table>
    </div>
  );
}