const mapReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_LAYER":
      return {
        ...state,
        activeLayers: state.activeLayers.includes(action.layerId)
          ? state.activeLayers.filter((id) => id !== action.layerId)
          : [...state.activeLayers, action.layerId],
        opacity: state.opacity || 1,
        weight: state.weight || 1,
      };
    default:
      return state;
  }
};

export default mapReducer;
