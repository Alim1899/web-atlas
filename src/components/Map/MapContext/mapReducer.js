const initialState = {
  activeLayers: [],
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

    default:
      return state;
  }
};

export { initialState };
export default mapReducer;
