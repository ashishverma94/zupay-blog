import { Button } from "./ui/button";
import Quiz from "../assets/quiz.png";
import Book from "../assets/book.png";
import Group from "../assets/group.png";
import NoteStack from "../assets/note-stack.png";
import AutoStories from "../assets/auto-stories.png";
import ManageAcc from "../assets/manage-account.png";
import ContractEdit from "../assets/contract-edit.png";
import RightPanel from "../assets/right_panel_open.png";
import useSideStore from "@/store/sideStore";

const SideBar = () => {
  const { curValue, setCurValue } = useSideStore();
  const button_class =
    "w-[40px] h-[40px] p-0 hover:bg-[#b69ff2] hover:ring-2 hover:ring-[#cdbef5]";

  return (
    <div className="w-[70px] h-[100vh] fixed top-0 bg-[white] pt-[80px]">
      <div className="bg-[white] flex flex-col justify-between pb-4  w-full h-full">
        <div className="bg-[white] flex flex-col items-center justify-center gap-2 mt-4">
          <Button
            onClick={() => setCurValue(0)}
            className={`${
              curValue === 0 ? "bg-[#b197f5]" : "bg-[white]"
            } ${button_class}`}
          >
            <img
              className=" w-[30px]"
              src="https://img.icons8.com/?size=100&id=i6fZC6wuprSu&format=png&color=000000"
              alt="home"
            />
          </Button>
          <Button
            onClick={() => setCurValue(1)}
            className={`${
              curValue === 1 ? "bg-[#b197f5]" : "bg-[white]"
            } ${button_class}`}
          >
            <img className="w-[30px]" src={AutoStories} alt="auto-stories" />
          </Button>
          <Button
            onClick={() => setCurValue(2)}
            className={`${
              curValue === 2 ? "bg-[#b197f5]" : "bg-[white]"
            } ${button_class}`}
          >
            <img className="w-[23px]" src={Book} alt="book" />
          </Button>
          <Button
            onClick={() => setCurValue(3)}
            className={`${
              curValue === 3 ? "bg-[#b197f5]" : "bg-[white]"
            } ${button_class}`}
          >
            <img className="w-[30px]" src={NoteStack} alt="note-stack" />
          </Button>
          <Button
            onClick={() => setCurValue(4)}
            className={`${
              curValue === 4 ? "bg-[#b197f5]" : "bg-[white]"
            } ${button_class}`}
          >
            <img className="w-[30px]" src={ContractEdit} alt="contract-edit" />
          </Button>
          <Button
            onClick={() => setCurValue(5)}
            className={`${
              curValue === 5 ? "bg-[#b197f5]" : "bg-[white]"
            } ${button_class}`}
          >
            <img className="w-[30px]" src={Group} alt="group" />
          </Button>
          <Button
            onClick={() => setCurValue(6)}
            className={`${
              curValue === 6 ? "bg-[#b197f5]" : "bg-[white]"
            } ${button_class}`}
          >
            <img className="w-[30px]" src={Quiz} alt="quiz" />
          </Button>
          <Button
            onClick={() => setCurValue(7)}
            className={`${
              curValue === 7 ? "bg-[#b197f5]" : "bg-[white]"
            } ${button_class}`}
          >
            <img className="w-[30px]" src={ManageAcc} alt="manage-account" />
          </Button>
        </div>
        <div className="bg-[white] flex flex-col items-center justify-center gap-2 mt-4">
          <Button className="w-[40px] h-[40px] p-0 bg-[white] hover:bg-[#b69ff2]">
            <img className="w-[30px]" src={RightPanel} alt="right-panel" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
