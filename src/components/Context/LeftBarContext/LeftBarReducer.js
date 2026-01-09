const LeftBarState = {
  isOpen: false,
  selectedCategory: null,
  expandedLayer: null,
};

const mapUIReducer = (state = LeftBarState, action) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return { ...state, isOpen: !state.isOpen };

    case "SELECT_CATEGORY":
      return { ...state, selectedCategory: action.payload };

    case "BACK_TO_CATEGORIES":
      return { ...state, selectedCategory: null };

    case "TOGGLE_ACCORDION":
      return {
        ...state,
        expandedLayer:
          state.expandedLayer === action.payload ? null : action.payload,
      };

    default:
      return state;
  }
};

export { LeftBarState };
export default mapUIReducer;
