import { useSelector } from "react-redux";
import { UserResponse } from "../model/user";

export default function UserProfilePage() {
  const authUser = useSelector((states) => states.authUser);
  const { name, email, avatar } = authUser as UserResponse;
  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10 mt-5">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={avatar}
          alt={name + " image"}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {email}
        </span>
      </div>
    </div>
  );
}
