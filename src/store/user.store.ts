import {
  FirebaseAuthentication,
  type User,
} from "@capacitor-firebase/authentication";
import { create } from "zustand";
import { combine } from "zustand/middleware";

interface UserStoreState {
  user: User | null;
  logIn: () => Promise<void>;
  logOut: () => Promise<void>;
  validateUser: () => Promise<void>;
  getTokenId: () => Promise<string>;
}

export const useUserStore = create<UserStoreState>()((set) => ({
  user: null,
  logIn: async () => {
    const result = await FirebaseAuthentication.signInWithGoogle();
    set((_) => ({
      user: result.user,
    }));
  },
  logOut: async () => {
    await FirebaseAuthentication.signOut();
    set({ user: null });
  },
  async validateUser() {
    const user = await FirebaseAuthentication.getCurrentUser();
    set({ user: user.user });
  },
  async getTokenId() {
    try {
      const { token } = await FirebaseAuthentication.getIdToken();

      return token;
    } catch (error) {
      console.error(error);
      return "";
    }
  },
}));

FirebaseAuthentication.addListener("authStateChange", (change) => {
  useUserStore.setState({ user: change.user });
});
