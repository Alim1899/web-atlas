import "./App.css";
import Layout from "./components/Layout/Layout";
import { MapsProvider } from "./components/Map/MapContext/MapContext";
function App() {
  return (
    <MapsProvider>
      <Layout />
    </MapsProvider>
  );
}

export default App;
