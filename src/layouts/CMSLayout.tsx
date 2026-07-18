import { Outlet } from "react-router-dom";
import Sidebar from "../components/navs/cms/Sidebar";
import TopNav from "../components/navs/cms/TopNav";

const CMSLayout = () => {
  return (
    <div className="min-h-screen flex bg-white font-sans text-neutral-800 antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#fcfcfd]">
        {/* Top Search & Profile Bar */}
        <TopNav />

        {/* Dynamic Nested Routes Content */}
        <main className="flex-1 overflow-y-auto px-10 pb-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CMSLayout;