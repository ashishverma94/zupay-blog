import useSideStore from "@/store/sideStore";
import { BlogCard, HeroSection, NoContent } from "@/components";
import { useEffect, useState } from "react";
import LoadingGif from "../assets/Loading2.gif";
import axios from "axios";

interface IBlogData {
  _id: string;
  title: string;
  conclusion: string;
  contentData: [{ cTitle: string; cDesc: string }];
  coverImgUrl: string;
}

const HomePage = () => {
  const { curValue } = useSideStore();
  const [blogData, setBlogData] = useState<IBlogData[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoadingData(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/posts`
        );
        setBlogData(response?.data?.blogs);
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
  }, []);

  return (
    <>
      {curValue === 0 ? (
        <div>
          <HeroSection />
          <form className="max-w-md mx-auto mb-6">
            <div className="relative">
              <div className="absolute  inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <img
                  src="https://img.icons8.com/?size=100&id=131&format=png&color=000000"
                  className=" h-[20px]"
                  alt="search-icon"
                />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full px-8 py-4 ps-10 text-sm text-gray-900 border border-gray-600 rounded-[30px] bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search blogs ..."
                required
              />
            </div>
          </form>

          {loadingData ? (
            <div className=" flex justify-center items-center w-full h-[40vh]">
              <img className="h-[100px]" src={LoadingGif} alt="loading-gif" />
            </div>
          ) : (
            <>
              {blogData.length === 0 ? (
                <div className="w-full h-[30vh] flex justify-center items-center text-[30px] font-[700] empty_text text-[white] ">
                  No Blogs found !
                </div>
              ) : (
                <div className="px-4 md:px-8 lg:px-16 grid grid-cols-1 justify-center place-items-center tablet:grid-cols-2 pc:grid-cols-3 gap-6">
                  {blogData.map((blog: IBlogData, index: number) => {
                    return (
                      <BlogCard
                        id={blog._id}
                        key={index}
                        title={blog.title}
                        coverImgUrl={blog.coverImgUrl}
                        conclusion={blog.conclusion}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <NoContent />
      )}
    </>
  );
};

export default HomePage;
