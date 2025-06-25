import app from "../../firebaseConfig";
import { getDatabase, get, ref } from "firebase/database";

const fetchGeoJson = async (type, layer) => {
  const db = getDatabase(app);
  try {
    const projectsRef = ref(db, `geojson/${type}/${layer}`);
    const snapshot = await get(projectsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log(`No JSON data available for ${layer}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching JSON", error);
  }
};
export default fetchGeoJson;
