import useSideStore from "@/store/sideStore";
import { BlogCard, HeroSection, NoContent } from "@/components";

const HomePage = () => {
  const { curValue } = useSideStore();

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

          <div className="px-4 md:px-8 lg:px-16 grid grid-cols-1 justify-center place-items-center tablet:grid-cols-2 pc:grid-cols-3 gap-6">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      ) : (
        <NoContent />
      )}
    </>
  );
};

export default HomePage;
