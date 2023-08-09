import { XMarkIcon } from "@heroicons/react/24/outline";
import { UserType } from "./Intro";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { mySchema } from "../lib/yup";

interface IEditForm {
  onClose: () => void;
  user: UserType;
  updateUser: (updatedUser: UserType) => void;
}

const EditForm = ({ onClose, user, updateUser }: IEditForm) => {
  const [photo, setPhoto] = useState("nese");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    defaultValues: user,
    resolver: zodResolver(mySchema),
  });

  const onSubmit = (data: UserType) => {
    try {
      if (data.photo && data.photo?.[0]) {
        setPhoto(URL.createObjectURL(data.photo?.[0]));
      }

      const validateData: UserType = mySchema.parse({ ...data, photo });
      updateUser(validateData);
      onClose();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="p-8 bg-slate-200 rounded-3xl">
      <div className="flex justify-end w-full ">
        <XMarkIcon
          onClick={onClose}
          className="w-6 transition-all cursor-pointer hover:text-gray-700"
        />
      </div>
      <form
        className="w-full max-w-lg m-auto "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-bold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none "
          />
          {errors.name?.message && (
            <div className="mt-1 text-sm text-red-500">
              {errors.name?.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="surname" className="block mb-1 font-bold">
            Surname:
          </label>
          <input
            type="text"
            id="surname"
            {...register("surname")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none "
          />
          {errors.surname?.message && (
            <div className="mt-1 text-sm text-red-500">
              {errors.surname?.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block mb-1 font-bold">
            Age:
          </label>
          <input
            type="number"
            id="age"
            {...register("age", { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none "
          />
          {errors.age?.message && (
            <div className="mt-1 text-sm text-red-500">
              {errors.age?.message}
            </div>
          )}
        </div>
        <div className="flex items-end justify-between gap-1 mb-4">
          <div>
            <label htmlFor="photo" className="block mb-1 font-bold">
              Add Photo:
            </label>
            <input
              className="file-input-bordered file-input"
              type="file"
              id="photo"
              {...register("photo")}
            />

            {errors.photo?.message && (
              <div className="mt-1 text-sm text-red-500">
                {errors.photo?.message as string}
              </div>
            )}
          </div>

          <button className="btn btn-accent">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
