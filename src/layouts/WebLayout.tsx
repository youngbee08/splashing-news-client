import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/navs/web/Header";
import Footer from "../components/navs/web/Footer";
import { useEffect } from "react";

const WebLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd]">
      {/* Main Header */}
      <Header />

      {/* Main Content Area */}
      <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WebLayout;
