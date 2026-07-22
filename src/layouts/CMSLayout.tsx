import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/navs/cms/Sidebar";
import TopNav from "../components/navs/cms/TopNav";
import BottomBar from "../components/navs/cms/BottomBar";
import { useEffect } from "react";

const CMSLayout = () => {
   const location = useLocation();
   useEffect(() => {
     window.scrollTo({ top: 0, behavior: "smooth" });
   }, [location]);
  return (
    <div className="min-h-screen flex bg-white font-sans text-neutral-800 antialiased relative">
      {/* Desktop Left Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#fcfcfd]">
        {/* Top Search & Profile Bar */}
        <TopNav />

        {/* Dynamic Nested Routes Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-10 pt-4 sm:pt-6 pb-24 lg:pb-12">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Bar Navigation Dock */}
      <BottomBar />
    </div>
  );
};

export default CMSLayout;