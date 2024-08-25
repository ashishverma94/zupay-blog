import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import useBlogStore from "@/store/blogStore";
import { Button } from "@/components/ui/button";
import { ContentInput, RedMark } from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const label_css = "block text-md font-medium text-gray-700";
  const { currBlog } = useBlogStore();

  const [error, setError] = useState<any>("");
  const [title, setNewTitle] = useState(currBlog.title);
  const [coverImgUrl, setNewCoverImgUrl] = useState(currBlog?.coverImgUrl);
  const [conclusion, setNewConclusion] = useState(currBlog?.conclusion);
  const [contentData, setNewContentData] = useState(currBlog?.contentData);

  const [loading, setLoading] = useState(false);

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
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${id}`,
        { title, coverImgUrl, contentData, conclusion },
        { withCredentials: true }
      );

      toast({
        style: { backgroundColor: "#4CAF50", color: "#fff" },
        description: "✔️ Blog updated successfully!",
      });

      navigate(`/blog/${id}`);
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
    <div className=" mt-[80px] bg-[#E5ECF3] w-full flex justify-center items-center ">
      <div className=" pc:w-[50%] w-[95%] tablet:w-[70%] flex flex-col justify-center items-center">
        <h1 className="font-[700] text-[30px] mt-4">Edit Blog</h1>
        <div className="w-full flex  flex-col gap-3">
          <div className="w-full">
            <label htmlFor="email" className={label_css}>
              Enter title of blog <RedMark />
            </label>
            <input
              value={title}
              onChange={(e) => setNewTitle(e.target.value)}
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
              onChange={(e) => setNewCoverImgUrl(e.target.value)}
              className=" h-[45px] px-2 mt-1 block w-full border border-[black] rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              placeholder="Cover image url ..."
            />
          </div>
          <h1 className="w-full text-[20px] font-[500]">Content Section</h1>

          <ContentInput
            contentData={contentData}
            setContentData={setNewContentData}
          />

          <div className="w-full">
            <label className={label_css}>
              Write conclusion <RedMark />
            </label>
            <textarea
              rows={8}
              style={{ height: "auto" }}
              value={conclusion}
              onChange={(e) => setNewConclusion(e.target.value)}
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

export default EditBlog;
