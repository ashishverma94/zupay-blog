import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isLoading: boolean;
  isLoggedIn: boolean;
  currUser: any;
  loginUser: any;
  logoutUser: any;
  error: any;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoading: false,
      isLoggedIn: false,
      currUser: null,
      error: null,

      loginUser: (data: any) => {
        set({ isLoggedIn: true, currUser: data });
      },
      logoutUser: () => {
        set({ currUser: null, isLoggedIn: false });
      },
    }),
    {
      name: "auth-store",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
