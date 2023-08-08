import { create } from "zustand";
import uuid from "react-uuid";

export interface IStore {
  users: UserType[];
  addUser: (user: UserType) => void;
  deleteUser: (id: string) => void;
  editUser: (user: UserType) => void;
  updateUser: (user: UserType) => void;
  // onDelete: (id: string) => void;
}

export type UserType = {
  name: string;
  surname: string;
  age: string;
  photo: FileList;
  id: string;
};

const useStore = create<IStore>((set) => {
  const storedUsers = localStorage.getItem("users");
  const initialUsers = storedUsers ? JSON.parse(storedUsers) : [];
  console.log(initialUsers);
  return {
    users: initialUsers,
    addUser: (user: UserType) => {
      set((state) => {
        const updatedUsers = [...state.users, { ...user, id: uuid() }];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { users: updatedUsers };
      });
    },
    deleteUser: (id: string) =>
      set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
    editUser: (editedUser: UserType) =>
      set((state) => ({
        users: state.users.map((user) =>
          user.id === editedUser.id ? editedUser : user
        ),
      })),

    updateUser: (updatedUser: UserType) =>
      set((state) => ({
        users: state.users.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        ),
      })),
  };
});

export { useStore };
