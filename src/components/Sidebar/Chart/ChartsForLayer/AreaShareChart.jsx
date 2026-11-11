// თემატური ფენა: კლასების წილი რეგიონის ფართობში.
// compact (ბეჭდვა) — კლასების სახელების გარეშე, ისინი ლეგენდაშია.
const km = (v) => Math.round(v).toLocaleString("ka-GE");
const pct = (v) => (v < 0.1 ? "<0.1 %" : `${v.toFixed(1)} %`);

export default function AreaShareChart({ data, compact = false }) {
  const rows = Array.isArray(data) ? data.filter((r) => r && r.label) : [];
  if (!rows.length) return null;

  const max = Math.max(...rows.map((r) => r.pct)) || 1;
  const total = rows.reduce((s, r) => s + r.area, 0);

  // ქვესათაურებად დაყოფა (თუ ფენას აქვს)
  const sections = [];
  rows.forEach((r) => {
    const key = r.group || "";
    let s = sections.find((x) => x.key === key);
    if (!s) sections.push((s = { key, rows: [] }));
    s.rows.push(r);
  });

  const columns = compact ? "14px 1fr 54px" : "14px minmax(140px, 1.3fr) 1fr 58px";

  return (
    <div style={{ color: "var(--light-text)", fontSize: compact ? 11 : 13 }}>
      {sections.map((s) => (
        <div key={s.key || "all"}>
          {s.key && (
            <div style={{ fontWeight: 700, margin: "10px 0 4px" }}>{s.key}</div>
          )}
          {s.rows.map((r) => (
            <div
              key={`${s.key}|${r.label}`}
              title={`${r.label}: ${km(r.area)} კმ² · ${pct(r.pct)}`}
              style={{
                display: "grid",
                gridTemplateColumns: columns,
                alignItems: "center",
                gap: 8,
                margin: compact ? "3px 0" : "5px 0",
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  background: r.color,
                  border: "1px solid rgba(0,0,0,.15)",
                }}
              />
              {!compact && (
                <span style={{ lineHeight: 1.25 }}>
                  {r.code && <b style={{ marginRight: 4 }}>{r.code}</b>}
                  {r.label}
                </span>
              )}
              <div
                style={{
                  height: compact ? 8 : 10,
                  borderRadius: 3,
                  background: "color-mix(in srgb, var(--light-text) 12%, transparent)",
                }}
              >
                <div
                  style={{
                    width: `${Math.max((r.pct / max) * 100, 1)}%`,
                    height: "100%",
                    borderRadius: 3,
                    background: r.color,
                  }}
                />
              </div>
              <span style={{ textAlign: "right", fontWeight: 700 }}>{pct(r.pct)}</span>
            </div>
          ))}
        </div>
      ))}
      <div style={{ marginTop: 8, opacity: 0.75, fontSize: compact ? 10 : 11 }}>
        წილი ფენის ფართობში · სულ {km(total)} კმ²
      </div>
    </div>
  );
}