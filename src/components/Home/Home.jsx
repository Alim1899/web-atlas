import classes from "./Home.module.css";
import Navbar from "../Navbar/Navbar";
import MapLayout from "../Map/MapLayout/MapLayout";
import Footer from "../Footer/Footer";
import useMaps from "../Context/MapContext/useMaps";
import Spinner from "../UI/Loader/Spinner";

const Home = () => {
  const { state } = useMaps();
  const { isLoading } = state;

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={classes.main}>
      <Navbar />
      <MapLayout />
      <Footer />
    </div>
  );
};

export default Home;

// import { getDatabase, ref, set } from "firebase/database";
// const savelayer = (name) => {
//   const db = getDatabase();
//   set(ref(db, `geojson/${name}`), ""); // Only adds or replaces this one child
// };
//  <button
//       style={{ height: "150px", width: "400px" }}
//       onClick={() => savelayer("erosion")}
//     ></button>

//  const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const content = JSON.parse(e.target.result); // Parse JSON content
//         const db = getDatabase();

//         set(ref(db, `geojson`), content)
//           .then(() => {
//             alert("GeoJSON uploaded successfully!");
//           })
//           .catch((err) => {
//             console.error("Upload failed:", err);
//             alert("Upload failed.");
//           });
//       } catch (err) {
//         alert("Invalid JSON file.", err);
//       }
//     };

//     reader.readAsText(file);
//   };
//       <input type="file" accept=".json" onChange={handleFileUpload} />
