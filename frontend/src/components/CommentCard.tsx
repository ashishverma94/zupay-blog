import { FC } from "react";
import Rating from "./Rating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getDPName, getRandomColor, timeAgo } from "@/utils/functions";

interface ICommentData {
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const CommentCard: FC<ICommentData> = ({
  name,
  rating,
  comment,
  createdAt,
}) => {
  const randomColor = getRandomColor();

  return (
    <div className="bg-[white] my-5 rounded-[12px] p-[12px]">
      <div className="flex justify-between">
        <div className="flex  items-center gap-1 my-1">
          <Avatar>
            <AvatarFallback
              className={`w-10 h-10 flex items-center justify-center text-lg font-bold rounded-full shadow-lg`}
              style={{
                backgroundColor: randomColor,
                color: "white",
              }}
            >
              <p className="text-[13px]">{getDPName(name)}</p>
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-[600] text-[15px] ">{name}</div>
            <p className="text-[11px] font-[500] leading-[13.2px] border-[1px] border-black text-black pb-1 px-[8px] py-[2px] rounded-full">
              {timeAgo(createdAt)}
            </p>
          </div>
        </div>
        <div>
          <Rating rating={rating} />
        </div>
      </div>
      <p className="text-[15px] font-[400] mt-2">&nbsp; &nbsp;{comment}</p>
    </div>
  );
};

export default CommentCard;
