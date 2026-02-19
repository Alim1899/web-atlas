import point from "../../../assets/map/point.svg";
const PointandLayeRenderer = ({ el, classes }) => {
  const svgToDataUrl = (svg) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  switch (el.name){
    case "battles":{
         const sign = el.data[2][1].sign;
         return (
             <>
            {el.data?.[0]?.map((item, i) => (
              <div key={`${el.type}-${i}`} className={classes.legendItem}>
                <img
                  className={classes.legendIcon}
                  src={item.sign ? svgToDataUrl(item.sign) : point}
                  alt={item.type}
                  width={Array.isArray(item.size) ? item.size[0] : 40}
                  height={Array.isArray(item.size) ? item.size[1] : 40}
                />
                <span className={classes.span}>{item.type}</span>
              </div>
            ))}

            <>
              <h4 style={{ marginLeft: "5vw" }}>ბრძოლები</h4>
              {el.data?.[1]?.map((item, i) => (
                <div key={`${el.type}-${i}`} className={classes.legendItem}>
                  <img
                    className={classes.legendIcon}
                    src={item.sign ? svgToDataUrl(item.sign) : point}
                    alt={item.name}
                    width={Array.isArray(item.size) ? item.size[0] : 25}
                    height={Array.isArray(item.size) ? item.size[1] : 25}
                  />
                  <span className={classes.span}>
                    {item.name} - {item.year}
                  </span>
                </div>
              ))}
            </>
            <>
              <h4
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "2vw",
                }}
              >
                დავით აღმაშენებლის მიერ დაბრუნებული ქალაქები{" "}
                <img
                  className={classes.legendIcon}
                  src={sign ? svgToDataUrl(sign) : point}
                  width={35}
                  height={35}
                />
              </h4>
              {el.data?.[2]?.map((item, i) => (
                <div key={`${el.type}-${i}`} className={classes.legendItem}>
                  <div></div>
                  <span className={classes.span}>
                    {item.name} - {item.year}
                  </span>
                </div>
              ))}
            </>
          </>
         )
    }
    case "churches":{
      const eparchy = Object.entries(el.data[1])||[];
         return ( 
          
               <>
          
             {el.data?.[0]?.map((item, i) => (
              <div key={`${el.type}-${i}`} className={classes.legendItem}>
                <img
                  className={classes.legendIcon}
                  src={item.sign ? svgToDataUrl(item.sign) : point}
                  alt={item.type}
                  width={Array.isArray(item.size) ? item.size[0] : 40}
                  height={Array.isArray(item.size) ? item.size[1] : 40}
                />
                <span className={classes.span}>{item.type}</span>
              </div>
            ))}
      <>
              <h4 className={classes.header}>მოქმედი მონასტრები</h4>
           
              {eparchy.map((item, i) => (
                <div key={`${el.type}-${i}`} className={classes.eparchy}>
                <h5 >{item[0]}</h5>
                {item[1].map(m=>(
                  <div key={`${el.type}-${i}-${m.name}`}>
                    <img
                    className={classes.legendIcon}
                    src={m.sign ? svgToDataUrl(m.sign) : point}
                    alt={m.name}
                    width={Array.isArray(m.size) ? m.size[0] : 25}
                    height={Array.isArray(m.size) ? m.size[1] : 25}
                  />
                   <span className={classes.span}>
                    {m.unicode}. {m.name}
                  </span>
                  </div>
                   
                  
              ))}
                 
                 
                </div>
              ))}
            </>
    

          </>
         
)
    }
 
    default: 
    return (
        el.data.map((item, i) => (
        <div key={`${el.name}-${i}`} className={classes.legendItem}>
          <img
            className={classes.legendIcon}
            src={item.sign ? svgToDataUrl(item.sign) : point}
            alt={item.name}
            width={Array.isArray(item.size) ? item.size[0] : 40}
            height={Array.isArray(item.size) ? item.size[1] : 40}
          />
          <span className={classes.span}>
            {item.name}
            {item.location && `, ${item.location}`}
          </span>
        </div>
      ))
    )
}
 
};
export default PointandLayeRenderer;
