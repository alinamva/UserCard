import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore, IStore, UserType } from "../store";
import Card from "./Card";
import EditForm from "./EditForm";

export interface Cards {
  user: UserType;
  deleteUser: (id: string) => void;
}

const Cards = () => {
  const { users, deleteUser, editUser, updateUser } = useStore() as IStore;
  // useEffect(() => {
  //   const storedUsers = localStorage.getItem("users");
  //   if (storedUsers) {
  //     updateUser(JSON.parse(storedUsers));
  //   }
  // }, []);

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
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-7 p-8">
      {users?.length > 0 && (
        <button
          className="btn btn-accent max-w-fit"
          onClick={() => navigate("/")}
        >
          Add another user
        </button>
      )}
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
