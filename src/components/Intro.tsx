import { useNavigate } from "react-router-dom";
import { IStore, UserType, useStore } from "../store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const mySchema = z.object({
  name: z
    .string()
    .min(2, "Name should has at least 2 letter")
    .max(50, "Name may has max 50 letters"),
  surname: z
    .string()
    .min(6, "Surname should has at least 6 letter")
    .max(50, "Surname may has max 50 letters"),
  age: z.number().min(18, "Age should be greater or equal than 18").max(60),
  photo: z.unknown(),
});

const Intro = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({ resolver: zodResolver(mySchema) });
  const { addUser } = useStore() as IStore;

  const onSubmit = (data: UserType) => {
    console.log("it worked", data);
    try {
      const validateData: any = mySchema.parse(data);
      addUser(validateData);
      const file = data.photo?.[0];
      console.log(file);
    } catch (error) {
      console.log("Error", error);
    }
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
        {errors.name?.message && (
          <div className="text-red-500 text-sm mt-1">
            {errors.name?.message}
          </div>
        )}
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
        {errors.surname?.message && (
          <div className="text-red-500 text-sm mt-1">
            {errors.surname?.message}
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block font-bold mb-1">
          Age:
        </label>
        <input
          type="number"
          id="age"
          {...register("age", { valueAsNumber: true })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none "
        />
        {errors.age?.message && (
          <div className="text-red-500 text-sm mt-1">{errors.age?.message}</div>
        )}
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
