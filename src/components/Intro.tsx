import { useNavigate } from "react-router-dom";
import { IStore, useStore } from "../store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { mySchema } from "../lib/yup";

export type UserType = z.infer<typeof mySchema>;

const Intro = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({ resolver: zodResolver(mySchema) });
  const { users, addUser } = useStore() as IStore;

  const onSubmit = (data: UserType) => {
    try {
      let blob = "";
      if (data.photo && data.photo?.[0]) {
        blob = URL.createObjectURL(data.photo?.[0]);
      }
      const validateData: UserType = mySchema.parse({ ...data, photo: blob });
      addUser(validateData);
    } catch (error) {
      console.log("Error", error);
    }
    navigate("/card");
  };
  return (
    <div className="flex flex-col gap-8">
      {users?.length > 0 && (
        <button
          className="btn btn-accent max-w-fit"
          onClick={() => navigate("/card")}
        >
          SHOW ALL USERS
        </button>
      )}
      <div className="text-center">
        <h1>Add a user</h1>
      </div>
      <form
        className="lg:w-2/4 w-11/12 m-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-1 font-bold"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full px-3 py-2  rounded-lg focus:outline-none "
          />
          {errors.name?.message && (
            <div className="mt-1 text-sm text-red-500">
              {errors.name?.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="surname"
            className="block mb-1 font-bold"
          >
            Surname:
          </label>
          <input
            type="text"
            id="surname"
            {...register("surname")}
            className="w-full px-3 py-2  rounded-lg focus:outline-none "
          />
          {errors.surname?.message && (
            <div className="mt-1 text-sm text-red-500">
              {errors.surname?.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block mb-1 font-bold"
          >
            Age:
          </label>
          <input
            type="number"
            id="age"
            {...register("age", { valueAsNumber: true })}
            className="w-full px-3 py-2  rounded-lg focus:outline-none "
          />
          {errors.age?.message && (
            <div className="mt-1 text-sm text-red-500">
              {errors.age?.message}
            </div>
          )}
        </div>
        <div className="flex items-end justify-between mb-4">
          <div className="w-full">
            <label
              htmlFor="photo"
              className="block mb-1 font-bold"
            >
              Add Photo:
            </label>
            <div className="flex lg:flex-row gap-8 flex-col w-full justify-between ">
              <input
                className="file-input file-input-ghost"
                type="file"
                id="photo"
                {...register("photo")}
              />

              {errors.photo?.message && (
                <div className="mt-1 text-sm text-red-500">
                  {errors.photo?.message as string}
                </div>
              )}
              <button className="btn btn-accent">SUBMIT</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Intro;
