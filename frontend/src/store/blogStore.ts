import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IBlogData {
  title: string;
  conclusion: string;
  contentData: [{ cTitle: string; cDesc: string }];
  coverImgUrl: string;
  createdAt: string;
}

interface IBlogStore {
  currBlog: IBlogData;
  setBlog: (data: any) => void;
}

const useBlogStore = create<IBlogStore>()(
  persist(
    (set) => ({
      currBlog: {} as IBlogData,
      setBlog: (data: any) => {
        set({ currBlog: data });
      },
    }),
    {
      name: "blog-data",
      getStorage: () => localStorage,
    }
  )
);

export default useBlogStore;
