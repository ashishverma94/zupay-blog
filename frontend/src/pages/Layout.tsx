import { Navbar } from "@/components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className=" flex-1   bg-[white] ">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
