import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGPTSearchView } from "../utils/gptSlice";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  /* ---------- Auth Listener ---------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  /* ---------- Outside Click Handler ---------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- Handlers ---------- */
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => navigate("/error"));
  };

  const handleGPTClick = () => {
    dispatch(toggleGPTSearchView());
  };

  /* ---------- UI ---------- */
  return (
    <header className="fixed top-0 left-0 w-full z-[1000] bg-gradient-to-b from-black px-24 py-4 flex justify-between items-center">
      {/* Logo */}
      <img
        src="./appName.png"
        alt="App Logo"
        className="w-40 object-contain cursor-pointer"
      />

      {/* Right Section */}
      {user && (
        <div className="flex items-center gap-6 relative pt-6" ref={menuRef}>
          {/* Language Dropdown */}
          {showGPTSearch && <LanguageSelector />}

          {/* GPT Icon */}
          <img
            src="./gptIcon.png"
            alt="GPT Search"
            className="w-9 h-9 cursor-pointer hover:-rotate-180 transition-transform duration-600"
            onClick={() => handleGPTClick()}
          />

          {/* User Icon */}
          <img
            src="./userIcon.png"
            alt="User Profile"
            className="w-10 h-10 rounded bg-yellow-500 p-1 cursor-pointer"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />

          {/* Dropdown */}
          {isMenuOpen && (
            <div className="absolute right-0 top-14 w-48 bg-black text-white rounded shadow-lg">
              <div className="px-4 py-3 border-b border-gray-400">
                <p className="font-semibold">{user.displayName}</p>
              </div>

              <button
                className="w-full flex items-center px-4 py-3 text-sm hover:bg-gray-700"
                onClick={handleSignOut}
              >
                <img src="./logout.png" alt="Logout" className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
