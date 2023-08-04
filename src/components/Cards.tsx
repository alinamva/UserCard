import { Link } from "react-router-dom";
import { useStore, IStore } from "../store";
import Card from "./Card";

const Cards = () => {
  const { users } = useStore() as IStore;
  console.log(users);
  if (users?.length <= 0) {
    return <div className="text-9xl font-extrabold">Beybuuuu</div>;
  }

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
          <Card user={user} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
