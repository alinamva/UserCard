import { useNavigate } from "react-router-dom";
import { IStore, UserType, useStore } from "../store";
import { useForm } from "react-hook-form";

const Intro = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<UserType>();
  const { addUser } = useStore() as IStore;

  const onSubmit = (data: UserType) => {
    addUser(data);
    const file = data.photo?.[0];
    console.log(file);
    navigate("/card");
  };

  return (
    <form className="w-2/4 m-auto pt-9" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name" className="block font-bold mb-1">
          Name:
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none "
        />
      </div>
      <div className="mb-4">
        <label htmlFor="surname" className="block font-bold mb-1">
          Surname:
        </label>
        <input
          type="text"
          id="surname"
          {...register("surname")}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none "
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block font-bold mb-1">
          Age:
        </label>
        <input
          type="number"
          id="age"
          {...register("age")}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none "
        />
      </div>
      <div className="mb-4">
        <label htmlFor="photo" className="block font-bold mb-1">
          Add Photo:
        </label>
        <input type="file" id="photo" {...register("photo")} />
        <input
          type="submit"
          className="px-4 py-2 mt-2 w-28 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        />
      </div>
    </form>
  );
};

export default Intro;
