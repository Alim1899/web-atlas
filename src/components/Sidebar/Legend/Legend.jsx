import classes from "./Legend.module.css";
import DraggableContainer from "../Helpers/DraggableContainer";
import MapHeaders from "../Helpers/MapHeaders";

const Legend = ({
  selectedChart,
  activeLayers,
  chartData,
  selectedLayer,
  handleSelected,
}) => {
  console.log(chartData);
  return (
    <DraggableContainer className={classes.main} header="ლეგენდა">
      <div className={classes.content}>
        <div className={classes.layers}>
          <MapHeaders
            layer="legend"
            activeLayers={activeLayers}
            chartData={chartData}
            selectedLayer={selectedLayer}
            handleSelected={handleSelected}
            selectedChart={selectedChart}
          />
        </div>

        {selectedChart &&
          Object.values(selectedChart.data).map((item) => (
            <div key={item.name_ge} className={classes.legend}>
              {item.description_ge.length > 0 &&
                item.description_ge.map((txt, i) => (
                  <>
                    <div
                      style={{
                        backgroundColor: item.color,
                      }}
                    />
                    <span className={classes.span} key={i}>
                      {txt}
                    </span>
                  </>
                ))}
                {item.description_ge.length===0&& <>
                   <div
                      style={{
                        backgroundColor: item.color,
                      }}
                    />
                    <span>{item.name_ge}</span>
                </>}
            </div>
          ))}
      </div>
    </DraggableContainer>
  );
};

export default Legend;
