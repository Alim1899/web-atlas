const Nolayer = ({ layer }) => {
  if (layer === "info" || layer === "legend") {
    return null;
  }

  return (
    <p style={{ display: "grid", placeContent: "center", color: "aliceblue" }}>
      <span style={{ textAlign: "center" }}>🚫</span>
      {layer === "none"
        ? "ფენა არჩეული არ არის"
        : layer === "diagram"
          ? "გთხოვთ აირჩიოთ პოლიგონალური ფენა"
          : "გთხოვთ აირჩიოთ სხვა ფენა"}
    </p>
  );
};

export default Nolayer;
