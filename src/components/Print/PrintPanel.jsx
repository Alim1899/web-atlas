import { useEffect, useState } from "react";
import { FaTimes, FaDownload } from "react-icons/fa";
import useMaps from "../Context/MapContext/useMaps";
import { useLegend } from "../Hooks/useLegend";
import useChartData from "../Hooks/useChartData";
import ChartPie from "../Sidebar/Chart/Pie";
import PolygonRenderer from "../Sidebar/Helpers/PolygonRenderer";
import PointandLayeRenderer from "../Sidebar/Helpers/PointandLayeRenderer";
import { exportSheet } from "./exportSheet";
import { DEFAULT_SOURCE, getTopLayer } from "./printUtils";
import classes from "./Print.module.css";
import useResizeWidth from "./useResizeWidth";

const PrintPanel = () => {
  const { state, dispatch } = useMaps();
  const { activeLayers, dataChart } = state;
  const { legendData } = useLegend();
  const { chartData } = useChartData();
  const [format, setFormat] = useState("png");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
const infoSize = useResizeWidth("right");
const panelSize = useResizeWidth("left");
  const exit = () => dispatch({ type: "SET_PRINT_MODE", payload: false });

  // Esc → ბეჭდვის რეჟიმიდან გასვლა
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && exit();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { id: topId, data: top } = getTopLayer(activeLayers, dataChart);
  const chart = chartData.find((c) => c.id === topId);
  const chartValues =
    chart &&
    (["farming", "religy", "ethnicity"].includes(chart.id)
      ? chart.data
      : Object.values(chart.data));
  // მხოლოდ ბოლოს ჩართული ფენის ლეგენდა
  const legend = Object.values(legendData)
    .flat()
    .find((el) => el.name === topId);

  const save = async () => {
    const sheet = document.getElementById("print-sheet");
    if (!sheet) return;
    setSaving(true);
    setError("");
    try {
      const date = new Date().toISOString().slice(0, 10);
      await exportSheet(sheet, format, `${topId || "atlas"}-${date}`);
    } catch (err) {
      console.error(err);
      setError("შენახვა ვერ მოხერხდა");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {top?.info && (
        <aside
  ref={infoSize.ref}
  className={`${classes.infoCol} ${classes.light}`}
  style={infoSize.width ? { width: infoSize.width } : undefined}
>
  <div
    className={`${classes.resizer} ${classes.resizerRight} no-print`}
    onPointerDown={infoSize.onPointerDown}
    onDoubleClick={infoSize.reset}
    title="გადაათრიე სიგანის შესაცვლელად · ორჯერ დაჭერა — ავტომატური"
  />
  <h2 className={classes.sectionTitle}>ინფორმაცია</h2>
  <p className={classes.info}>{top.info}</p>
</aside>
      )}

      <aside
  ref={panelSize.ref}
  className={`${classes.panel} ${classes.light}`}
  style={panelSize.width ? { width: panelSize.width, maxWidth: "none" } : undefined}
>
  <div
    className={`${classes.resizer} ${classes.resizerLeft} no-print`}
    onPointerDown={panelSize.onPointerDown}
    onDoubleClick={panelSize.reset}
    title="გადაათრიე სიგანის შესაცვლელად · ორჯერ დაჭერა — ავტომატური"
  />
        {legend && (
          <section className={classes.section}>
            <h2 className={classes.sectionTitle}>ლეგენდა</h2>
            {!!legend.header && <h3 className={classes.header}>{legend.header}</h3>}
            {legend.shape === "polygon" && <PolygonRenderer el={legend} classes={classes} />}
            {(legend.shape === "points" || legend.shape === "line") && (
              <PointandLayeRenderer el={legend} classes={classes} />
            )}
          </section>
        )}

       {chart && (
  <section className={classes.section}>
    <h2 className={classes.sectionTitle}>დიაგრამა</h2>
    <div className={classes.chart}>
      <ChartPie
        key={chart.id}
        data={chartValues}
        dataKey="totalArea"
        nameKey="name_ge"
        selectedLayer={chart.id}
        compact
      />
    </div>
  </section>
)}
      </aside>

      <footer className={`${classes.footer} ${classes.light}`}>
        წყარო: {top?.source ?? DEFAULT_SOURCE}
      </footer>

      <div className={`${classes.toolbar} no-print`}>
        <button className={classes.button} onClick={exit} title="Esc">
          <FaTimes /> დახურვა
        </button>

        <div className={classes.saveGroup}>
          {error && <span className={classes.error}>{error}</span>}
          <label className={classes.label} htmlFor="print-format">
            ფორმატი
          </label>
          <select
            id="print-format"
            className={classes.select}
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            disabled={saving}
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="pdf">PDF</option>
          </select>
          <button
            className={`${classes.button} ${classes.primary}`}
            onClick={save}
            disabled={saving}
          >
            <FaDownload /> {saving ? "ინახება..." : "შენახვა"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PrintPanel;