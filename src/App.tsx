import { Route, Routes } from "react-router-dom";
import Home from "./pages/web/Home";
import WebLayout from "./layouts/WebLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<WebLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
