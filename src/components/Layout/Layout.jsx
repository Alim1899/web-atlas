import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../Home/Home";
import Map from "../Map/Map/Map";
const Layout = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route index element={<Home />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Layout;
