export const getLayerTitle = (layer) => {
    console.log(layer);
  switch (layer) {
    case "ethnicity":
      return "ეროვნული შემადგენლობა (%)";
    case "religy":
      return "აღმსარებლობა (%)";
    case "ownership":
      return "საკუთრების ტიპი (%)";
    case "migration":
      return "მიგრაცია";
    default:
      return "მონაცემები";
  }
};