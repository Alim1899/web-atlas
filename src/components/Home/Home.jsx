import classes from "./Home.module.css";
import Navbar from "../Navbar/Navbar";
import MapLayout from "../Map/MapLayout/MapLayout";
import Footer from "../Footer/Footer";
import useMaps from "../Context/MapContext/useMaps";
import Spinner from "../UI/Loader/Spinner";

const Home = () => {
  const { state } = useMaps();
  const { isLoading, printMode } = state;

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={classes.main}>
      {!printMode && <Navbar />}
      <MapLayout />
      {!printMode && <Footer />}
    </div>
  );
};
export default Home;

