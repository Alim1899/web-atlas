import classes from './MapLayout.module.css'
import Map from '../Map/Map'
import MapList from '../MapList/MapList'
const MapLayout = () => {
  return (
    <div className={classes.map}>
    <div className={classes.mapList}>
        <MapList/>
    </div>
      <Map/>
    </div>
  )
}

export default MapLayout
