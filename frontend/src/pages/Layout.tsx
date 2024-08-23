import { Navbar, SideBar } from "@/components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <SideBar />
        <div className=" flex-1 ml-[70px]  bg-[white] ">
          <div className="mt-[85px] p-[20px] bg-[#E5ECF3] min-h-[90vh]  rounded-tl-[20px]">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
