import React from "react";
import {
  HiUser
} from "react-icons/hi2";

const UserProfile = () => {
  return (
    <div className="flex flex-row">
      <div className="flex items-center justify-center rounded-full bg-gray-200 p-3">
        <HiUser className="h-6 w-6 " />
      </div>
      <div className="ml-3 flex flex-col">
        <div className="font-bold">Adrian</div>
        <div className="text-sm text-green-500">Edit profile</div>
      </div>
    </div>
  );
};

export default UserProfile;
