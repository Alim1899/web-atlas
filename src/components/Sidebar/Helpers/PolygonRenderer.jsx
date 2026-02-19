
const PolygonRenderer = ({el,classes}) => {
  return (
     <>
                  
                    {el.hasSubHeader &&
                      el.data.map((group, gIdx) => (
                        <div
                          className={classes.subheader}
                          key={`${el.name}-${group.subheader}-${gIdx}`}
                        >
                          {group.subheader && <h2>{group.subheader}</h2>}

                          {group.items?.map((elem, iIdx) => (
                            <div
                              key={`${el.name}-${group.subheader}-${elem.index ?? iIdx}`}
                              className={classes.legendItem}
                            >
                              <div
                                className={classes.legendColor}
                                style={{ backgroundColor: elem.color }}
                              >
                                <span>{elem?.unicode}</span>
                              </div>

                              <span className={classes.span}>{elem.txt}</span>
                            </div>
                          ))}
                        </div>
                      ))}

                    {!el.hasSubHeader &&
                      el.data.map((item, idx) => (
                        <div
                          key={`${el.name}-${idx}`}
                          className={classes.legendItem}
                        >
                          <div
                            className={classes.legendColor}
                            style={{ backgroundColor: item.color }}
                          >
                            <span>{item?.unicode}</span>
                          </div>
                          <span className={classes.span}>{item.txt}</span>
                        </div>
                      ))}
                  </>
  )
}

export default PolygonRenderer
