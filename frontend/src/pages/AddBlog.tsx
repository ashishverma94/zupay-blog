import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentInput, RedMark } from "@/components";
import { useToast } from "@/components/ui/use-toast";

const AddBlog = () => {
  const label_css = "block text-md font-medium text-gray-700";
  const [title, setTitle] = useState<string>("");
  const [coverImgUrl, setCoverImgUrl] = useState<string>("");
  const [contentData, setContentData] = useState<any>([
    { cTitle: "", cDesc: "" },
  ]);
  const [conclusion, setConclusion] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  setTimeout(() => {
    setError("");
  }, 4000);

  const handleSubmit = async () => {
    if (!title) {
      setError("Please enter title of blog");
    }
    if (!coverImgUrl) {
      setError("Please enter URL of cover image");
    }
    if (!contentData[contentData.length - 1].cTitle) {
      setError("Please enter title of content");
    }
    if (!contentData[contentData.length - 1].cDesc) {
      setError("Please enter description");
    }
    if (!conclusion) {
      setError("Please enter conclusion");
    }

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        { title, coverImgUrl, contentData, conclusion },
        { withCredentials: true }
      );

      toast({
        style: { backgroundColor: "#4CAF50", color: "#fff" },
        description: "✔️ Blog added successfully!",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: err.message || "Server Error !",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full flex justify-center items-center ">
      <div className=" pc:w-[50%] w-[95%] tablet:w-[70%] flex flex-col justify-center items-center">
        <h1 className="font-[700] text-[30px]">Add New Blog</h1>

        <div className="w-full flex  flex-col gap-3">
          <div className="w-full">
            <label htmlFor="email" className={label_css}>
              Enter title of blog <RedMark />
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className=" h-[45px] px-2 mt-1 block w-full border border-[black] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Title ..."
            />
          </div>
          <div className="w-full">
            <label htmlFor="email" className={label_css}>
              Enter cover image url <RedMark />
            </label>
            <input
              value={coverImgUrl}
              onChange={(e) => setCoverImgUrl(e.target.value)}
              className=" h-[45px] px-2 mt-1 block w-full border border-[black] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Cover image url ..."
            />
          </div>
          <h1 className="w-full text-[20px] font-[500]">Content Section</h1>

          <ContentInput
            contentData={contentData}
            setContentData={setContentData}
          />

          <div className="w-full">
            <label className={label_css}>
              Write conclusion <RedMark />
            </label>
            <textarea
              rows={8}
              style={{ height: "auto" }}
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              className=" h-[45px] p-3 px-2 mt-1 block w-full border border-[black] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Write Conclusion ..."
            />
          </div>
          <div className="flex flex-col mb-5 py-3 justify-center items-center">
            <div className="h-[40px] font-[500] text-[red]">
              {error && error}
            </div>
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={() => handleSubmit()}
                className="px-[25px] py-[15px] font-[500] text-[18px] rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md transition duration-150 ease-in-out transform hover:scale-105 w-auto"
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
