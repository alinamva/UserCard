import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore, IStore } from "../store";
import Card from "./Card";
import EditForm from "./EditForm";
import { UserType } from "./Intro";

export interface Cards {
  user: UserType;
  deleteUser: (id: string) => void;
}

const Cards = () => {
  const { users, deleteUser, updateUser } = useStore() as IStore;
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<UserType | null>(null);

  const handleDelete = (id: string) => {
    deleteUser(id);
  };
  const handleEdit = (user: UserType) => {
    setEditMode(true);
    setEditedUser({ ...user });
  };
  {
    users.length == 0 && navigate("/");
  }
  return (
    <div className="flex flex-col   p-7 gap-7">
      {users?.length > 0 && (
        <div className="w-full flex justify-center sm:justify-start">
          <button
            className="btn btn-accent  max-w-fit"
            onClick={() => navigate("/")}
          >
            Add another user
          </button>
        </div>
      )}
      <div className="grid  lg:grid-cols-3 md:grid-cols-2  justify-center gap-8">
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
        <div className="fixed inset-0 bg-black/75">
          <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <EditForm
              user={editedUser}
              onClose={() => setEditMode(false)}
              updateUser={updateUser}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
