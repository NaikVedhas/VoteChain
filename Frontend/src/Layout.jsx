import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";
import ScrollToTop from "./ScrollToTop";

function Layout() {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-row min-h-screen bg-gray-100">
        {/* Sidebar Navigation */}
        <Navbar />
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;