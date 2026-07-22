import { Route, Routes } from "react-router-dom";
import Home from "./pages/web/Home";
import News from "./pages/web/News";
import PostDetail from "./pages/web/PostDetail";
import WebLayout from "./layouts/WebLayout";
import CMSLayout from "./layouts/CMSLayout";
import Login from "./pages/cms/auth/Login";
import { Toaster } from "sonner";
import Overview from "./pages/cms/dashboard/Overview";
import Posts from "./pages/cms/dashboard/Posts";
import AddPost from "./pages/cms/dashboard/AddPost";
import ProtectedRoute from "./utils/ProtectedRoute";
import OtherNews from "./pages/web/OtherNews";

const App = () => {
  return (
    <>
      <Toaster richColors closeButton />

      <Routes>
        <Route path="/auth/admin-login" element={<Login />} />

        <Route element={<WebLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/articles/:cat" element={<OtherNews />} />
          <Route path="/post/:slug" element={<PostDetail />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<CMSLayout />}>
            <Route path="/admin/overview" element={<Overview />} />
            <Route path="/admin/posts" element={<Posts />} />
            <Route path="/admin/add-post" element={<AddPost />} />
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
