import { create } from "zustand";
export interface IStore {
  users: UserType[];
  addUser: (user: UserType) => void;
}

export type UserType = {
  name: string;
  surname: string;
  age: string;
  photo: FileList;
};

const useStore = create<IStore>((set) => ({
  users: [],
  addUser: (user: UserType) =>
    set((state) => ({ users: [...state.users, user] })),
}));

export { useStore };
