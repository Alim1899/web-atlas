const Nolayer = ({ layer }) => {
  return (
    <p style={{ display: "grid", placeContent: "center", color: "aliceblue" }}>
      <span style={{ textAlign: "center" }}>🚫</span>
      {layer === "none"
        ? "ფენა არჩეული არ არის"
        : layer === "diagram"
        ? "გთხოვთ აირჩიოთ პოლიგონალური ფენა"
        : layer === "info"
        ? "ამ ფენისთვის დამატებითი ინფორმაცია არ არის ხელმისაწვდომი"
        : layer === "legend"
        ? "ამ ფენას არ აქვს ლეგენდა"
        : "გთხოვთ აირჩიოთ სხვა ფენა"}
    </p>
  );
};

export default Nolayer;
