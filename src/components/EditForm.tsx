import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { UserType } from "../store";

interface IEditForm {
  onClose: () => void;
  user: UserType;
  updateUser: (updatedUser: UserType) => void;
}
const EditForm = ({ onClose, user, updateUser }: IEditForm) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedData = {
      id: user.id,
      name: e.target.name.value,
      surname: e.target.surname.value,
      age: e.target.age.value,
      photo: photoFile ? [photoFile] : user.photo,
    };
    updateUser(updatedData);
    // console.log(updatedData);
    localStorage.setItem("editedUser", JSON.stringify(updatedData));
    onClose();
  };
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
    }
  };
  return (
    <div className=" bg-slate-200 rounded-3xl p-8">
      <div
        className="flex w-full justify-end  cursor-pointer "
        onClick={onClose}
      >
        <XMarkIcon className="w-6 " />
      </div>
      <form className=" m-auto " onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            defaultValue={user.name}
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
            defaultValue={user.surname}
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
            defaultValue={user.age}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none "
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block font-bold mb-1">
            Add Photo:
          </label>
          <input type="file" id="photo" onChange={handlePhotoChange} />
          <input
            type="submit"
            className="px-4 py-2 mt-2 w-28 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          />
        </div>
      </form>
    </div>
  );
};

export default EditForm;
