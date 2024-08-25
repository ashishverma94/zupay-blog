import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="max-w-7xl mx-auto relative">
        <div className="relative py-2 flex justify-center px-4 sm:px-0">
          <div className="max-w-3xl text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 xl:text-4xl font-serif !leading-tight">
              Read the most interesting Blogs
            </h1>
            <p
              className="mt-4 text-lg sm:text-xl leading-8 text-gray-800 sm:px-16"
              style={{ whiteSpace: "pre-line;" }}
            >
              Blog reading is crucial for personal and professional growth, as
              it provides access to diverse perspectives and up-to-date
              information on various topics.
            </p>
            <div className="mt-8 flex w-full space-x-8 justify-center">
              <button
                onClick={() => navigate("/add-blog")}
                className="inline-flex items-center justify-center  py-3 border border-transparent  font-medium focus:outline-none ring-2 ring-offset-2 ring-transparent ring-offset-transparent disabled:bg-gray-400 appearance-none text-white bg-[#6947BF] hover:bg-[#8b60fb] focus:ring-[#6947BF] focus:ring-offset-white !px-12 !shadow-lg !rounded-full !text-base"
              >
                <p className="flex justify-center items-center gap-2">
                  <img
                    src="https://img.icons8.com/?size=100&id=36929&format=png&color=FFFFFF"
                    className="h-[30px] "
                    alt="pen"
                  />
                  Create New Blog
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
