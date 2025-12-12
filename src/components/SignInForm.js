import React, { useState } from "react";

const SignInForm = () => {
    const [isSignIn, setIsSignIn] = useState(true);

  const handleSubmit = () => {};

  const handleSignIn = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div><form className="absolute bg-black p-12 w-3/12 my-40 mx-auto right-0 left-0 rounded-md bg-opacity-80 text-white">
        <h1 className="text-white text-3xl font-bold mx-3 my-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 mx-3 my-2 rounded-md w-full bg-gray-300 text-black placeholder-gray-600"
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          className="p-3 mx-3 my-2 rounded-md w-full bg-gray-300 text-black placeholder-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 mx-3 my-3 rounded-md w-full bg-gray-300 text-black placeholder-gray-600"
        />
        <button
          className="bg-yellow-400 p-3 mx-3 my-2 rounded-md w-full font-semibold text-black"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-3 mx-3 my-2" onClick={() => handleSignIn()}>
            {isSignIn ? "New to Flixmind? Sign Up":"Already registered? Sign In"}
        </p>
      </form></div>
  )
}

export default SignInForm