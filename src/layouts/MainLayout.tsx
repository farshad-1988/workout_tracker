import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "sonner";

const MainLayout = () => {
  return (
    <div className="w-full h-full ">
      <Navbar />
      <div className="w-full  flex items-center bg-transparent justify-center">
        <Outlet />
        <Toaster position="top-center" />
      </div>
    </div>
  );
};

export default MainLayout;
