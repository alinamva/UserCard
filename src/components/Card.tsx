import { UserType } from "../store";

export interface ICardProps {
  user: UserType;
  onDelete: (id: string) => void;
  onEdit: (user: UserType) => void;
}

const Card = ({ user, onDelete, onEdit }: ICardProps) => {
  const { name, surname, age, photo } = user;

  const fileObject = photo && photo.length > 0 ? photo[0] : null;
  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-w-[200px]">
      {fileObject && (
        <img
          src={URL.createObjectURL(fileObject)}
          className="w-32 h-32 mx-auto rounded-full object-cover"
        />
      )}
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-lg text-gray-600">{surname}</p>
        <p className="text-md text-gray-400">Age: {age}</p>
      </div>
      <div className="w-full flex justify-between py-2">
        <button className="btn btn-success" onClick={() => onEdit(user)}>
          Edit
        </button>
        <button className="btn btn-error" onClick={() => onDelete(user.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
