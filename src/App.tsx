import { Route, Routes } from "react-router-dom";
import Home from "./pages/web/Home";
import News from "./pages/web/News";
import Politics from "./pages/web/Politics";
import Business from "./pages/web/Business";
import Health from "./pages/web/Health";
import Sports from "./pages/web/Sports";
import PostDetail from "./pages/web/PostDetail";
import WebLayout from "./layouts/WebLayout";
import CMSLayout from "./layouts/CMSLayout";
import Login from "./pages/cms/auth/Login";
import { Toaster } from "sonner";
import Overview from "./pages/cms/dashboard/Overview";
import Posts from "./pages/cms/dashboard/Posts";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <>
      <Toaster richColors closeButton />

      <Routes>
        <Route path="/auth/admin-login" element={<Login />} />

        <Route element={<WebLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/politics" element={<Politics />} />
          <Route path="/business" element={<Business />} />
          <Route path="/health" element={<Health />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/post/:slug" element={<PostDetail />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<CMSLayout />}>
            <Route path="/admin/overview" element={<Overview />} />
            <Route path="/admin/posts" element={<Posts />} />
          </Route>
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
    </>
  );
};

export default App;
