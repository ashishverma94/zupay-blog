import NoContentImg from "../assets/no_content.svg";

const NoContent = () => {
  return (
    <div className="w-full justify-center flex flex-col items-center h-[80vh] empty_text text-[40px] font-[700] text-white ">
      <img src={NoContentImg} alt="no-content" />
      <span>No data available to display.</span>
      <span> Please check back later.</span>
    </div>
  );
};

export default NoContent;
