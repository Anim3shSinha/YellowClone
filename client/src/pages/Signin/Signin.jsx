import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";

import { useNavigate } from "react-router-dom";
import { CONST } from "../../constant";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(
        // "http://localhost:5000/api/auth/signin",
        `${CONST.server}/api/auth/signin`,
        {
          username,
          password,
        },
        {
          withCredentials: true, //correct
        }
      );
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      // const res = await axios.post("http://localhost:5000/api/auth/signup", {
      const res = await axios.post(`${CONST.server}/api/auth/signup`, {
        username,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
    }
  };

  return (
    <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
      <h2 className="text-3xl font-bold text-center">
        {isSignIn ? "Sign in to Twitter" : "Sign up for Twitter"}
      </h2>

      {isSignIn ? (
        <>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="text-xl py-2 rounded-full px-4 border border-gray-300 focus:outline-none focus:border-blue-500"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="text-xl py-2 rounded-full px-4 border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
            onClick={handleLogin}
          >
            Sign in
          </button>
          <p className="text-center text-xl">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsSignIn(false)}
            >
              Sign up
            </span>
          </p>
        </>
      ) : (
        <>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="text-xl py-2 rounded-full px-4"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            required
            className="text-xl py-2 rounded-full px-4"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="text-xl py-2 rounded-full px-4"
          />
          <button
            onClick={handleSignup}
            className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
            type="submit"
          >
            Sign up
          </button>
          <p className="text-center text-xl">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsSignIn(true)}
            >
              Sign in
            </span>
          </p>
        </>
      )}
    </form>
  );
};

export default Signin;
