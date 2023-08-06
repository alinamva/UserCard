import { create } from "zustand";
import uuid from "react-uuid";

export interface IStore {
  users: UserType[];
  addUser: (user: UserType) => void;
  // onDelete: (id: string) => void;
}

export type UserType = {
  name: string;
  surname: string;
  age: string;
  photo: FileList;
  id: string;
};

const useStore = create<IStore>((set) => ({
  users: [],
  addUser: (user: UserType) =>
    set((state) => ({ users: [...state.users, { ...user, id: uuid() }] })),
  deleteUser: (id) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
  editUser: (editedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === editedUser.id ? editedUser : user
      ),
    })),
}));

export { useStore };
