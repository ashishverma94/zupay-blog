import axios from "axios";
import { useEffect, useState } from "react";
import useSideStore from "@/store/sideStore";
import LoadingGif from "../assets/Loading2.gif";
import { BlogCard, HeroSection, NoContent, SearchBar } from "@/components";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/posts`
        );
        setBlogData(response?.data?.blogs);
      } catch (err: any) {
        console.log(err);
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
          <SearchBar items={blogData} />

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
