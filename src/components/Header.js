import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [isUserActive, setIsUserActive] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const handleUserActive = () => {
    setIsUserActive(!isUserActive);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="absolute w-screen px-28 py-5 mx-auto bg-gradient-to-b from-black z-10 flex justify-between">
      <img src="./appName.png" alt="app-name-logo" className="w-44 py-1 h-16" />

      {/* User Profile */}
      {user && (
        <div className="relative">
          <img
            src="./userIcon.png"
            alt="user-icon"
            className="w-10 h10 p-1 my-2 bg-yellow-500 rounded-md cursor-pointer"
            onClick={handleUserActive}
          />
          {/* {user && } */}
          {isUserActive && (
            <div className="absolute right-0 mt-2 p-2 bg-black text-white rounded-md w-40">
              <h2 className="font-bold my-2 p-2">{user?.displayName}</h2>
              <h4 className="text-sm p-2 my-1 cursor-pointer">Account</h4>
              <button
                className="text-sm p-2 py-3 cursor-pointer border-t w-full flex"
                onClick={handleSignOut}
              >
                <img
                  src="./logout.png"
                  alt="logout-icon"
                  className="w-5 h-5 mr-3"
                />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
