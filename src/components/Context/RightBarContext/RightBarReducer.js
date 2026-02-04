const RightBarState = {
  isExpanded: false,
  activePanel: null, // "chart" | "layers" | "legend" | "info"
  legendLayers: [],
  selectedLayer: null,
  activeData: [],
};

const RightBarReducer = (state = RightBarState, action) => {
  switch (action.type) {
    case "TOGGLE_EXPAND": {
      const isExpanded = !state.isExpanded;

      return {
        ...state,
        isExpanded,
        activePanel: isExpanded ? null : null,
      };
    }

    case "TOGGLE_PANEL": {
      if (!state.isExpanded) {
        return {
          ...state,
          isExpanded: true,
          activePanel: action.payload,
        };
      }

      if (state.activePanel === action.payload) {
        return {
          ...state,
          activePanel: null,
        };
      }

      return {
        ...state,
        activePanel: action.payload,
      };
    }
    case "DATA_ARRIVED": {
      const savedLayer = sessionStorage.getItem("header");
      const layers = action.payload;

      const firstLayer = Object.keys(layers)[0] || null;

      const selectedLayer =
        savedLayer && layers[savedLayer] ? savedLayer : firstLayer;

      return {
        ...state,
        legendLayers: layers,
        selectedLayer,
        activeData: selectedLayer ? layers[selectedLayer] : [],
      };
    }

    case "LAYER_CHANGED": {
      return {
        ...state,
        selectedLayer: action.payload,
        activeData: state.legendLayers[action.payload] || [],
      };
    }

    default:
      return state;
  }
};

export { RightBarState };
export default RightBarReducer;
