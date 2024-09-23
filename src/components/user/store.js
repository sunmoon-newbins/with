import { create } from "zustand";
import { persist } from "zustand/middleware";

// zustand store 생성
const useStore = create(
  persist(
    (set) => ({
      userId: "",
      password: "",
      isLoggedIn: false,
      rememberMe: false,
      setUserId: (userId) => set({ userId }),
      setPassword: (password) => set({ password }),
      toggleRememberMe: () =>
        set((state) => ({ rememberMe: !state.rememberMe })),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, userId: "", password: "" }),
    }),
    {
      name: "user-storage", // 저장소의 키 이름
      getStorage: () => AsyncStorage, // AsyncStorage를 사용하여 상태를 저장하고 불러옴
    }
  )
);

export default useStore;
