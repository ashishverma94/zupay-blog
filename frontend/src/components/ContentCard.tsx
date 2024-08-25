import { FC } from "react";

interface props {
  cTitle: string;
  cDesc: string;
  index: number;
}

const ContentCard: FC<props> = ({ cTitle, cDesc }) => {
  return (
    <div className=" rounded-[12px] p-[12px] flex flex-col gap-[8px] bg-[white]">
      <h1 className="font-[700] text-[24px] leading-[28.8px]">{cTitle}</h1>
      <div dangerouslySetInnerHTML={{ __html: cDesc }} />
    </div>
  );
};

export default ContentCard;
