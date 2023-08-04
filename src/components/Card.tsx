import { UserType } from "../store";

interface ICardProps {
  user: UserType;
}

const Card = ({ user }: ICardProps) => {
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
    </div>
  );
};

export default Card;
