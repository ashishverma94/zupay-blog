import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";
import Logo from "../assets/logo.png";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, logoutUser } = useUserStore();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/logout-user`,
        {},
        { withCredentials: true }
      );

      logoutUser();
      toast({
        style: { backgroundColor: "#4CAF50", color: "#fff" },
        description: "Logged out successfully!",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: err.message || "Server Error !",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full top-0 fixed z-20 border-t-[4px] border-[#6947BF] h-[10vh] flex justify-between bg-[white] pt-[16px] pb-[60px]">
      <div>
        <img className="h-[40px] px-6" src={Logo} alt="logo" />
      </div>
      {!isLoggedIn ? (
        <div className="px-[10px] gap-3 flex ">
          <Button
            onClick={() => navigate("/login")}
            className="bg-[white] border-[2px] w-[90px] hover:bg-[gray] hover:text-[white] text-[#5B6170] rounded-[20px]"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            className="bg-[#6947BF] w-[90px] hover:bg-[#b69df5] hover:text-[black] rounded-[20px]"
          >
            Join Now
          </Button>
        </div>
      ) : (
        <div className="px-[10px] gap-3 flex ">
          <Button className=" p-0 w-[40px] bg-[white] border-[4px] hover:bg-[#6947BF] hover:ring-2 hover:ring-[#6947BF]  hover:text-[black] rounded-[20px]">
            <img
              src="https://img.icons8.com/?size=100&id=95101&format=png&color=000000"
              className="w-[30px]"
              alt="profile"
              title="Profile"
            />
          </Button>
          {isLoading ? (
            <Button disabled className="rounded-[25px] w-[45px]">
              <ReloadIcon className="w-4  animate-spin" />
            </Button>
          ) : (
            <Button
              onClick={() => handleLogout()}
              className="bg-[#6947BF] p-0 w-[40px] hover:bg-[#6947BF] hover:ring-2 hover:ring-[#ae96ea]  hover:text-[black] rounded-[20px]"
            >
              <img
                src="https://img.icons8.com/?size=100&id=24340&format=png&color=FFFFFF"
                className="w-[30px]"
                alt="Logout"
                title="Logout"
              />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
