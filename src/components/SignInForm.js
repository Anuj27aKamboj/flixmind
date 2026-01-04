import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignInForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleValidation = () => {
    const message = isSignIn
      ? checkValidData(email.current.value, password.current.value)
      : checkValidData(
          email.current.value,
          password.current.value,
          fullName.current.value
        );

    setErrorMessage(message);
    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(({ user }) =>
          updateProfile(user, {
            displayName: fullName.current.value,
          }).then(() => {
            const { uid, email, displayName } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName }));
          })
        )
        .catch((error) =>
          setErrorMessage(`${error.code} - ${error.message}`)
        );
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      ).catch((error) =>
        setErrorMessage(`${error.code} - ${error.message}`)
      );
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="absolute bg-black p-12 w-[90%] md:w-3/12 my-40 mx-auto right-0 left-0 rounded-md bg-opacity-80 text-white"
    >
      <h1 className="text-3xl font-bold mb-4">
        {isSignIn ? "Sign In" : "Sign Up"}
      </h1>

      {!isSignIn && (
        <input
          ref={fullName}
          type="text"
          placeholder="Full Name"
          className="p-3 mb-3 w-full rounded bg-gray-300 text-black"
        />
      )}

      <input
        ref={email}
        type="email"
        placeholder="Email Address"
        className="p-3 mb-3 w-full rounded bg-gray-300 text-black"
      />

      <input
        ref={password}
        type="password"
        placeholder="Password"
        className="p-3 mb-3 w-full rounded bg-gray-300 text-black"
      />

      {errorMessage && (
        <p className="text-red-500 font-bold mb-2">{errorMessage}</p>
      )}

      <button
        onClick={handleValidation}
        className="bg-yellow-400 p-3 w-full rounded text-black font-semibold"
      >
        {isSignIn ? "Sign In" : "Sign Up"}
      </button>

      <p
        className="mt-4 cursor-pointer"
        onClick={() => setIsSignIn(!isSignIn)}
      >
        {isSignIn
          ? "New to Flixmind? Sign Up"
          : "Already registered? Sign In"}
      </p>
    </form>
  );
};

export default SignInForm;
