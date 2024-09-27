import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// zustand store 생성
const useStore = create(
  persist(
    (set) => ({
      // 초기 상태 설정 (더미 데이터)
      id: "123",
      password: "123",
      name: "홍길동",
      birth: "1990-01-01",
      profile: "profile description",
      country: "KOR",
      nickname: "길동이",
      language: "KOR",
      isLoggedIn: false, // 기본값 false
      rememberMe: true, //
      // 둘다 트루면 로그인 된상태로 계속 앱 켜짐.

      // 상태 업데이트 함수들
      setId: (id) => set({ id }),

      setPassword: (password) => set({ password }),
      setName: (name) => set({ name }),
      setBirth: (birth) => set({ birth }),
      setProfile: (profile) => set({ profile }),
      setCountry: (country) => set({ country }),
      setNickname: (nickname) => set({ nickname }),
      setLanguage: (language) => set({ language }),
      toggleRememberMe: () =>
        set((state) => ({ rememberMe: !state.rememberMe })),
      login: () => set({ isLoggedIn: true }),
      // logout: () => set({ isLoggedIn: false, userId: "", password: "" }),

      logout: async () => {
        // AsyncStorage 데이터 삭제
        await AsyncStorage.removeItem("user-storage");

        set({
          isLoggedIn: false,
          id: "",
          password: "",
          name: "",
          birth: "",
          profile: "",
          country: "",
          nickname: "",
          language: "",
          rememberMe: false,
        });
      },

      // 전체 업데이트 함수
      setUserData: (userData) => set(userData),
    }),
    {
      name: "user-storage", // 저장소의 키 이름
      // getStorage: () => AsyncStorage, // AsyncStorage를 사용하여 상태를 저장하고 불러옴
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStore;
