import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore, IStore, UserType } from "../store";
import Card from "./Card";
import EditForm from "./EditForm";

export interface Cards {
  user: UserType;
  deleteUser: (id: string) => void;
}

const Cards = () => {
  const { users, deleteUser, editUser, updateUser } = useStore() as IStore;
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      updateUser(JSON.parse(storedUsers));
    }
  }, []);
  // console.log(users);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<UserType | null>(null);

  const handleDelete = (id: string) => {
    deleteUser(id);
  };
  const handleEdit = (user: UserType) => {
    editUser(user);
    setEditMode(true);
    setEditedUser({ ...user });
  };

  return (
    <div className="flex flex-col gap-7 p-8">
      <Link
        to="/"
        className="px-4 py-2 mt-2 w-fit text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        <span>Add another user</span>
      </Link>
      <div className="flex gap-6 flex-wrap justify-center">
        {users?.map((user, index) => (
          <Card
            user={user}
            key={index}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {editMode && editedUser && (
        <div className="absolute top-[20%] left-[35%]">
          <EditForm
            user={editedUser}
            onClose={() => setEditMode(false)}
            updateUser={updateUser}
          />
        </div>
      )}
    </div>
  );
};

export default Cards;
