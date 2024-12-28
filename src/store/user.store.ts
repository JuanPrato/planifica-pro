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
}));

FirebaseAuthentication.getCurrentUser().then((user) =>
  useUserStore.setState({ user: user.user })
);
