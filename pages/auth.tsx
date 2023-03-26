import { useCallback, useState } from "react";
import axios from "axios";
import { motion as m } from "framer-motion";
import { signIn } from "next-auth/react";
import Input from "../components/input";

import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [varient, setVarient] = useState("login");

  const toggleVarient = useCallback(() => {
    setVarient((currentVarient) =>
      currentVarient === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url(/images/hero.jpg)] bg-no-repeat bg-center bg-fixed bg-cover ">
      <div className="bg-black w-full h-full lg:bg-opacity-40">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <m.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.7 } }}
          className="flex justify-center"
        >
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {varient == "login" ? "Sign In" : "Register"}
            </h2>

            <div className="flex flex-col gap-4">
              {varient == "register" && (
                <Input
                  id="name"
                  label="Username"
                  type="text"
                  onChange={(e: any) => setName(e.target.value)}
                  value={name}
                />
              )}
              <Input
                id="email"
                onChange={(e: any) => setEmail(e.target.value)}
                label="Email"
                type="email"
                value={email}
              />
              <Input
                id="password"
                onChange={(e: any) => setPassword(e.target.value)}
                label="Password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={varient === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {varient == "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center mt-8 justify-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle
                  size={30}
                  onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {varient == "login"
                ? " First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVarient}
                className="text-white ml-1 hover:underline   cursor-pointer"
              >
                {varient == "login" ? " Create an account" : "Login"}
              </span>
            </p>
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default Auth;
