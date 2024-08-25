import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-col mt-[80px] bg-[#E5ECF3] h-[90vh]  text-white flex justify-center items-center font-[1000] text-[45px]">
      <div className="empty_text">404</div>
      <div className="empty_text">Page Not Found</div>
      <Button
        onClick={() => navigate("/")}
        className="text-[white] text-[17px] font-[400] my-2 bg-[#6947BF] hover:bg-[#6947BF] hover:ring-2 hover:ring-[#a286e7] "
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
