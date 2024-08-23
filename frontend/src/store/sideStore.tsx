import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISideStore {
  curValue: number;
  setCurValue: (data: number) => void;
}

const useSideStore = create<ISideStore>()(
  persist(
    (set) => ({
      curValue: 0,
      setCurValue: (data: number) => {
        set({ curValue: data });
      },
    }),
    {
      name: "side-value",
      getStorage: () => localStorage,
    }
  )
);

export default useSideStore;
