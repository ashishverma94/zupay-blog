import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IBlogData {
  _id: string;
  title: string;
  conclusion: string;
  contentData: [{ cTitle: string; cDesc: string }];
  coverImgUrl: string;
}

const SearchBar: FC<{ items: IBlogData[] }> = ({ items }) => {
  const [query, setQuery] = useState("");
  const [searchedData, setSearchedData] = useState<IBlogData[]>([]);
  const [showList, setShowList] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query === "") {
      setSearchedData([]);
      setShowList(false);
      return;
    }
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchedData(filteredItems);
    setShowList(filteredItems.length > 0);
  }, [query, items]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowList(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative p-4 max-w-lg mx-auto" ref={ref}>
      <form className=" mx-auto">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <img
              src="https://img.icons8.com/?size=100&id=131&format=png&color=000000"
              className="h-5"
              alt="search-icon"
            />
          </div>
          <input
            type="search"
            id="default-search"
            value={query}
            onFocus={() => setShowList(true)}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full px-10 py-4 text-sm text-gray-900 border border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search blogs ..."
          />
        </div>
      </form>
      {showList && (
        <ul className="absolute z-10 w-[94%] mx-auto bg-[#ffffffb3] border rounded-lg shadow-md">
          {searchedData.length > 0 ? (
            searchedData.map((item, index) => (
              <li
                key={index}
                onClick={() => navigate(`/blog/${item._id}`)}
                className="px-4 font-[500] cursor-pointer py-2 border-b last:border-b-0 hover:bg-gray-100"
              >
                {item.title}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No items found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
