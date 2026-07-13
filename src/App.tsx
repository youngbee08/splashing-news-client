import { Route, Routes } from "react-router-dom";
import Home from "./pages/web/Home";
import News from "./pages/web/News";
import Politics from "./pages/web/Politics";
import Business from "./pages/web/Business";
import Health from "./pages/web/Health";
import Sports from "./pages/web/Sports";
import PostDetail from "./pages/web/PostDetail";
import WebLayout from "./layouts/WebLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<WebLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/business" element={<Business />} />
        <Route path="/health" element={<Health />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/post/:slug" element={<PostDetail />} />
      </Route>
      <Route
        path="*"
        element={
          <>
            <div className="h-screen flex flex-col items-center justify-center font-mono! font-light text-neutral-500">
              <p>404 | Page not found</p>
            </div>
          </>
        }
      />
    </Routes>
  );
};

export default App;
