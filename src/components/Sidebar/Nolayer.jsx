const Nolayer = ({ layer }) => {
  return (
    <p style={{ display: "grid", placeContent: "center", color: "aliceblue" }}>
      <span style={{ textAlign: "center" }}>🚫</span>
      {layer === "none" ? "ფენა არჩეული არ არის" : "გთხოვთ აირჩიოთ სხვა ფენა"}
    </p>
  );
};

export default Nolayer;
