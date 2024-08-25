import { FC } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

type props = {
  id: string;
  title: string;
  conclusion: string;
  coverImgUrl: string;
};

const BlogCard: FC<props> = ({ id, title, conclusion, coverImgUrl }) => {
  const navigate = useNavigate();

  return (
    <div className="transition-transform bg-[#E5ECF3] duration-300 ease-in-out hover:scale-105">
      <div className="card shadow-2xl bg-[#E5ECF3] hover:translate-1 ease-in-out">
        <div
          className="imgBx"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            background: `url(${coverImgUrl})`,
          }}
        ></div>
        <div className="content">
          <span className="price flex ">
            <div className="w-full h-full flex justify-center items-center">
              <Button
                onClick={() => navigate(`/blog/${id}`)}
                className="relative bg-[white] text-[black] hover:text-[white]  px-[20px] py-[10px] mx-[15px] my-[15px] block rounded-[6px] font-[700]"
              >
                View Blog
              </Button>
            </div>
          </span>
          <div className="relative text-[white] h-[82%]  px-[20px] py-[5px] mx-[5px] my-[5px] block rounded-[6px] font-[600]">
            <h1 className="text-[white] font-[600]">{title}</h1>
            <p className="text-[white] text-[14px] font-[400]">{conclusion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
