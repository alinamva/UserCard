import { UserType } from "./Intro";
import { UserIcon } from "@heroicons/react/24/solid";
export interface ICardProps {
  user: UserType;
  onDelete: (id: string) => void;
  onEdit: (user: UserType) => void;
}

const Card = ({ user, onDelete, onEdit }: ICardProps) => {
  const { name, surname, age, photo } = user;

  const colors: string[] = [
    " bg-orange-200 ",
    " bg-blue-200 ",
    " bg-green-200 ",
    " bg-yellow-200 ",
    " bg-emerald-200 ",
    " bg-cyan-200 ",
    " bg-indigo-200 ",
    " bg-rose-200 ",
    " bg-pink-200",
    " bg-violet-200 ",
    " bg-sky-200 ",
    " bg-teal-200",
    " bg-slate-200 ",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="bg-white rounded-lg shadow-xl  min-w-[230px]">
      <div
        className={`h-[40px] ${randomColor} rounded-t-lg w-full relative`}
      ></div>
      <div className="w-full p-6 rounded-lg h-fit">
        {photo ? (
          <div className="relative flex items-center justify-center mb-4">
            <img
              src={photo}
              className="object-cover w-24 h-24 mx-auto rounded-full"
            />
          </div>
        ) : (
          <div className="relative flex items-center justify-center mb-4">
            <div className="relative flex justify-center w-24 h-24 overflow-hidden border rounded-full">
              <UserIcon className="absolute w-24 h-24 -bottom-1.5" />
            </div>
          </div>
        )}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-lg text-gray-600">{surname}</p>
          <p className="text-gray-400 text-md">Age: {age}</p>
        </div>
        <div className="flex justify-between w-full py-2">
          <button
            className="btn btn-success btn-sm"
            onClick={() => onEdit(user)}
          >
            Edit
          </button>

          <button
            className="btn btn-error btn-sm"
            onClick={() => onDelete(user.id || "")}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
