const initialState = {
  activeLayers: [],
  baselayer: {
    url: "https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=4gNWcAfO6xj7SYyWp2KI",
    attribution:
      '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  },
  dataChart: [],
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_LAYER":
      return {
        ...state,
        activeLayers: state.activeLayers.some(
          (layer) => layer.id === action.layerId
        )
          ? state.activeLayers.filter((layer) => layer.id !== action.layerId)
          : [
              ...state.activeLayers,
              { id: action.layerId, opacity: 1, weight: 1 },
            ], // Default values
      };

    case "SET_OPACITY":
      return {
        ...state,
        activeLayers: state.activeLayers.map((layer) =>
          layer.id === action.layerId
            ? { ...layer, opacity: action.payload }
            : layer
        ),
      };

    case "SET_WEIGHT":
      return {
        ...state,
        activeLayers: state.activeLayers.map((layer) =>
          layer.id === action.layerId
            ? { ...layer, weight: action.payload }
            : layer
        ),
      };
    case "SET_MAP":
      return {
        ...state,
        baselayer: { url: action.url, attribution: action.attribution },
      };
    case "SET_DATA_CHART":
      return { ...state, dataChart: action.payload };

    default:
      return state;
  }
};

export { initialState };
export default mapReducer;
