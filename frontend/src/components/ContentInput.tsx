import { FC, useMemo, useRef } from "react";
import RedMark from "./RedMark";
import JoditEditor from "jodit-react";
import { Button } from "./ui/button";

type props = {
  contentData: [any];
  setContentData: any;
};

const ContentInput: FC<props> = ({ contentData, setContentData }) => {
  const editor = useRef(null);
  const label_css = "block text-md font-medium text-gray-700";

  const handleAddContent = () => {
    setContentData([...contentData, { cTitle: "", cDesc: "" }]);
    setTimeout(() => {
      const bottomLineElement = document.getElementById("bottomLine");

      if (bottomLineElement) {
        const rect = bottomLineElement.getBoundingClientRect();

        window.scrollTo({
          top: window.scrollY + rect.bottom - window.innerHeight + 45,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  const handleRemoveContent = (index: number) => {
    const list = [...contentData];
    list.splice(index, 1);
    setContentData(list);
  };

  const handleCTitleChange = (e: any, index: number) => {
    const { value, name } = e.target;
    const list = [...contentData];
    list[index][name] = value;
    setContentData(list);
  };

  const handleEditorChange = (newValue: string, index: number) => {
    const updatedContentData = [...contentData];
    updatedContentData[index].cDesc = newValue;
    setContentData(updatedContentData);
  };

  const options = [
    "bold",
    "italic",
    "underline",
    "eraser",
    "ul",
    "ol",
    "font",
    "fontsize",
    "paragraph",
    "lineHeight",
    "superscript",
    "subscript",
    "image",
    "hr",
    "table",
    "link",
    "symbols",
    "indent",
    "outdent",
  ];

  const config = useMemo(
    () => ({
      height: "340px",
      readonly: false,
      placeholder: "Enter description ... ",
      defaultActionOnPaste: "insert_as_html",
      defaultLineHeight: 1.5,
      enter: "div",
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
    }),
    []
  );
  return (
    <>
      {contentData?.map((data: any, index: number) => {
        return (
          <div key={index}>
            <div className=" flex flex-col gap-2 p-2 border-[1px] rounded-md border-[black]">
              <div className="w-full">
                <label htmlFor="email" className={label_css}>
                  Enter title of section <RedMark />
                </label>
                <input
                  value={data.cTitle}
                  name="cTitle"
                  onChange={(e) => handleCTitleChange(e, index)}
                  className=" h-[45px] px-2 mt-1 block w-full border border-[black] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                  placeholder="Content title ..."
                />
              </div>
              <label htmlFor="email" className={label_css}>
                Enter description of section <RedMark />
              </label>
              <div className="border-[1px] p-1 bg-white border-[black] rounded-md">
                <JoditEditor
                  ref={editor}
                  value={data.cDesc}
                  name="cDesc"
                  // @ts-ignore
                  config={config}
                  onChange={(newValue) => handleEditorChange(newValue, index)}
                />
              </div>
              {contentData.length > 1 && (
                <div className="flex gap-3 ">
                  <Button
                    onClick={() => handleRemoveContent(index)}
                    className="bg-[red] hover:ring-2 hover:bg-[red] hover:ring-[red]"
                  >
                    Delete Section
                  </Button>
                </div>
              )}
            </div>
            <div className="w-full  mt-4 justify-end flex ">
              {contentData.length - 1 === index && (
                <Button
                  id="bottomLine"
                  onClick={() => handleAddContent()}
                  disabled={
                    !contentData[contentData.length - 1].cTitle ||
                    !contentData[contentData.length - 1].cDesc
                  }
                  className="bg-[#27b0f0] disabled:bg-[gray] disabled:border-black disabled:border-[2px] hover:ring-2 hover:bg-[#27b0f0] hover:ring-[#27b0f0]"
                >
                  Add New Section
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ContentInput;
