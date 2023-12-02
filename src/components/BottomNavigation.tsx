import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../assets/home.svg?react";
import RankingIcon from "../assets/ranking-icon.svg?react";
import AddCircleIcon from "../assets/add-circle-icon.svg?react";
import UserProfileIcon from "../assets/user-profile-icon.svg?react";
import DoorLeftIcon from "../assets/door-left.svg?react";

interface BottomNavProps {
  onLogout: () => void;
}

const BottomNavigation: React.FC<BottomNavProps> = ({ onLogout }) => {
  const [pathname, setPathName] = useState(window.location.pathname);

  return (
    <>
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Link
            to="/"
            onClick={() => setPathName("/")}
            className={`inline-flex ${
              pathname === "/" ? "bg-gray-900" : ""
            } flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group`}
          >
            <HomeIcon />
          </Link>

          <Link
            to="/leaderboard"
            onClick={() => setPathName("/leaderboard")}
            className={`
            ${pathname === "/leaderboard" ? "bg-gray-900" : ""} 
            inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}
          >
            <RankingIcon />
          </Link>

          <div className="flex items-center justify-center">
            <Link
              to="/create"
              onClick={() => setPathName("/create")}
              data-tooltip-target="tooltip-new"
              className={`inline-flex
              ${pathname === "/create" ? "bg-gray-900" : ""}
              items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800`}
            >
              <AddCircleIcon />
            </Link>
          </div>
          <Link
            to="/me"
            data-tooltip-target="tooltip-profile"
            onClick={() => setPathName("/me")}
            className={`
            ${pathname === "/me" ? "bg-gray-900" : ""}
            inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}
          >
            <UserProfileIcon />
          </Link>
          <Link
            onClick={onLogout}
            className="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <DoorLeftIcon />
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomNavigation;
