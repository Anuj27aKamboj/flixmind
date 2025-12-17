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
    const validationMessage = isSignIn
      ? checkValidData(email.current.value, password.current.value)
      : checkValidData(
          email.current.value,
          password.current.value,
          fullName.current.value
        );

    // console.log(fullName.current.value);
    // console.log(email.current.value);
    // console.log(password.current.value);

    setErrorMessage(validationMessage);

    if (validationMessage) return;

    // SignIn/ SignUp Logic

    if (!isSignIn) {
      // SignUp Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // SignIn Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const handleSignIn = () => {
    setErrorMessage(null);
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black p-12 w-3/12 my-40 mx-auto right-0 left-0 rounded-md bg-opacity-80 text-white"
      >
        <h1 className="text-white text-3xl font-bold mx-3 my-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={fullName}
            type="text"
            placeholder="Full Name"
            className="p-3 mx-3 my-2 rounded-md w-full bg-gray-300 text-black placeholder-gray-600"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-3 mx-3 my-2 rounded-md w-full bg-gray-300 text-black placeholder-gray-600"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 mx-3 my-3 rounded-md w-full bg-gray-300 text-black placeholder-gray-600"
        />
        <p className="p-3 mx-3 my-2 text-red-500 text-lg font-bold">
          {errorMessage}
        </p>
        <button
          className="bg-yellow-400 p-3 mx-3 my-2 rounded-md w-full font-semibold text-black"
          onClick={() => handleValidation()}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="p-3 mx-3 my-2 cursor-pointer"
          onClick={() => handleSignIn()}
        >
          {isSignIn
            ? "New to Flixmind? Sign Up"
            : "Already registered? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
