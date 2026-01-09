const RightBarState = {
  isExpanded: false,
  activePanel: null, // "chart" | "layers" | "legend" | "info"
};

const RightBarReducer = (state = RightBarState, action) => {
  switch (action.type) {
    case "TOGGLE_EXPAND": {
      const isExpanded = !state.isExpanded;

      return {
        isExpanded,
        activePanel: isExpanded ? null : null,
      };
    }

    case "TOGGLE_PANEL": {
      if (!state.isExpanded) {
        return {
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

    default:
      return state;
  }
};

export { RightBarState };
export default RightBarReducer;
