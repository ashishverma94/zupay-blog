import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { timeAgo } from "@/utils/functions";
import useBlogStore from "@/store/blogStore";
import { Button } from "@/components/ui/button";
import LoadingGif from "../assets/Loading2.gif";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { CommentCard, CommentPopup, ContentCard } from "@/components";

interface IBlogData {
  _id: string;
  title: string;
  conclusion: string;
  contentData: [{ cTitle: string; cDesc: string }];
  coverImgUrl: string;
  createdAt: string;
}

interface ICommentData {
  name: string;
  rating: number;
  comment: string;
}

const BlogDetailsPage = () => {
  const { setBlog } = useBlogStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [blogDetail, setBlogDetail] = useState<IBlogData | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoadingData(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/posts/${id}`
        );
        setBlogDetail(response?.data?.blog);
        setBlog(response?.data?.blog);
      } catch (err: any) {
        if (err.response) {
          setError(err?.response.data.message || "An error occurred");
        } else {
          setError(err.message || "An unexpected error occurred");
        }
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [id]);

  const handleScroll = (index: number) => {
    const element = document.getElementById(`content-${index}`);
    if (element) {
      const elementTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementTop - 80,
        behavior: "smooth",
      });
    }
  };

  // DELETE FUNCTIONALITY
  const [open, setOpen] = useState<boolean>(false);
  const [delLoading, setDelLoading] = useState<boolean>(false);
  const [delErr, setDelErr] = useState<string | null>("");

  const handleClickOutside = (event: any) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      setDelLoading(true);
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`);
      toast({
        style: { backgroundColor: "#4CAF50", color: "#fff" },
        description: "Blog deleted successfully!",
      });
      navigate("/");
    } catch (error: any) {
      setDelErr(
        error.response?.data.message || error.message || "Internal server error"
      );
      toast({
        variant: "destructive",
        description:
          error.response?.data.message ||
          error.message ||
          "Internal server error",
      });
    } finally {
      setDelLoading(false);
      setOpen(false);
    }
  };

  setTimeout(() => {
    setDelErr("");
  }, 4000);

  // GET COMMENTS OF BLOG
  const [comments, setComments] = useState<ICommentData[] | null>(null);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoadingComments(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/get-comments/${id}`
        );
        setComments(response?.data?.comments);
      } catch (err: any) {
        if (err.response) {
          toast({
            variant: "destructive",
            description:
              err?.response.data.message ||
              "Failed to load comments for this blog!",
          });
        } else {
          toast({
            variant: "destructive",
            description:
              err.message || "Failed to load comments for this blog!",
          });
        }
      } finally {
        setLoadingComments(false);
      }
    };

    fetchData();
  }, [id]);

  // COMMENT POPUP
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="pc:w-[50%] tablet:w-[70%] w-[95%] py-4  flex flex-col">
      {error && <div> {error && error} </div>}
      {loadingData || !blogDetail ? (
        <div className=" flex justify-center items-center w-full h-[70vh]">
          <img className="h-[100px]" src={LoadingGif} alt="loading-gif" />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className=" px-10">
            <span className=" w-[150px]   flex justify-center items-center rounded-full border-[#aba9a9] border-[1px]">
              <span className="font-[500] text-[16px] leading-[19.2px] py-1 text-[#7A8196]">
                Useful Resources
              </span>
            </span>
            <h1 className="text-[32px] leading-[38.4px] font-[800]">
              {blogDetail.title}
            </h1>
            <div className="flex gap-5">
              <div>
                <h1 className="font-[600] text-[14px] leading-[18.8px]">
                  Published
                </h1>
                <h1 className="font-[500] text-[11px] leading-[13.2px]">
                  {timeAgo(blogDetail.createdAt)}
                </h1>
              </div>
              <div>
                <h1 className="font-[600] text-[14px] leading-[18.8px]">
                  Read Time
                </h1>
                <h1 className="font-[500] text-[11px] leading-[13.2px]">
                  4 mins
                </h1>
              </div>
            </div>
          </div>
          <div className="flex  justify-end gap-4">
            <Button
              onClick={() => navigate(`/edit-blog/${id}`)}
              className="bg-[#30acfa] hover:ring-2 hover:ring-[#30acfa] hover:bg-[white] hover:text-[black]"
            >
              Update Blog
            </Button>
            <Button
              onClick={() => setOpen(true)}
              className="bg-[#f82323] hover:ring-2 hover:ring-[#f82323] hover:bg-[#f4f2f2] hover:text-[black]"
            >
              Delete Blog
            </Button>
          </div>
          <div className="w-full">
            <img
              className="w-full"
              src={blogDetail.coverImgUrl}
              alt={blogDetail.title}
            />
          </div>
          <div className=" px-10 flex flex-col gap-5">
            <div className=" rounded-[12px] p-[12px] flex flex-col gap-[8px] bg-[white]">
              <h1 className="text-[#1E2026] font-[700] text-[24px] leading-[28.8px]">
                Contents
              </h1>
              <ol className="px-[22px]" style={{ listStyleType: "decimal" }}>
                {blogDetail.contentData.map((content, index: number) => {
                  return (
                    <li
                      className="font-[400] cursor-pointer text-[16px] leading-[20.8px] text-[#6947BF] underline"
                      key={index}
                      onClick={() => handleScroll(index)}
                    >
                      {content.cTitle}
                    </li>
                  );
                })}
              </ol>
            </div>
            {blogDetail.contentData.map((data, index: number) => {
              return (
                <div id={`content-${index}`}>
                  <ContentCard
                    index={index}
                    key={index}
                    cTitle={data.cTitle}
                    cDesc={data.cDesc}
                  />
                </div>
              );
            })}
            <div className=" rounded-[12px] p-[12px] flex flex-col gap-[8px] bg-[white]">
              <h1 className="font-[700] text-[24px] leading-[28.8px]">
                Conclusion
                <span className="rotated-letter text-[22px] ml-1">✏️</span>
              </h1>
              <p className="text-[16px] font-[400] leading-[20.8px]">
                {blogDetail.conclusion}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* COMMENTS  */}
      <>
        {loadingComments ? (
          <div className=" flex justify-center items-center w-full h-[70vh]">
            <img className="h-[100px]" src={LoadingGif} alt="loading-gif" />
          </div>
        ) : (
          <div className="px-10 mt-7 ">
            <div className="flex justify-between items-center">
              <span className="font-[800] text-[32px] leading-[38.4px]">
                Comments
              </span>
              <Button
                onClick={() => setIsPopupOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out"
              >
                Give Comment
              </Button>
            </div>
            <div>
              {comments && comments.length === 0 ? (
                <div className=" w-full mt-[40px] font-[500] text-[30px] flex justify-center ">
                  No comments on this blog.
                </div>
              ) : (
                <div>
                  {comments &&
                    comments
                      .slice()
                      .reverse()
                      .map((comment: any, index: number) => {
                        return (
                          <CommentCard
                            key={index}
                            name={comment.name}
                            rating={comment.rating}
                            comment={comment.comment}
                            createdAt={comment.createdAt}
                          />
                        );
                      })}
                </div>
              )}
            </div>
          </div>
        )}
      </>
      {isPopupOpen && (
        <CommentPopup
          setIsPopupOpen={setIsPopupOpen}
          id={id}
          setComments={setComments}
          comments={comments}
        />
      )}
      {/* DELETE BLOG POPUP  */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="relative bg-white pb-6 h-max p-2 rounded-lg shadow-lg w-11/12 max-w-md">
            <button
              className="absolute top-1 right-4 text-[red]  hover:text-[#ec6767] text-2xl"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>

            <div className="h-full flex flex-col justify-center w-full items-center px-4">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Delete Blog
              </h2>

              <h1 className="font-bold text-[gray] py-2 text-center ">
                Are you sure you want to delete this blog? This action cannot be
                undone.
              </h1>
              <h1 className="flex flex-wrap justify-center items-center text-center font-bold text-[#4a4949]"></h1>

              <div className=" h-[25px] ">
                {delErr && (
                  <h1 className="text-[red] font-bold">Error : {delErr}</h1>
                )}
              </div>
              <div className="text-center flex  items-center justify-center gap-3">
                {delLoading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleDeleteBlog()}
                    className="px-[25px] py-[15px] font-[500] text-[18px] rounded-md bg-gradient-to-r from-[green] to-[#5eee5e] text-white hover:from-[#46dc44] hover:to-[#48c027] focus:outline-none focus:ring-2 focus:ring-[green] hover:text-[black] hover:border-[2px] hover:border-[green] focus:ring-offset-2 shadow-md transition duration-150 ease-in-out transform hover:scale-105 w-auto"
                  >
                    Yes
                  </Button>
                )}
                <Button
                  onClick={() => setOpen(false)}
                  className="px-[25px] py-[15px] font-[500] text-[18px] rounded-md bg-gradient-to-r from-[#ff0000] to-[#f66c6c] text-white hover:from-[#ec4a4a] hover:to-[#b02222] focus:outline-none focus:ring-2 focus:ring-[red]  hover:text-[black] hover:border-[2px] hover:border-[red] focus:ring-offset-2 shadow-md transition duration-150 ease-in-out transform hover:scale-105 w-auto"
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailsPage;
