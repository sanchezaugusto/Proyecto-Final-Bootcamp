"use client";

import Link from "next/link";
import {
  IconAvatar,
  IconLock,
  IconEye,
  IconMail,
  IconLoading,
} from "@/assets/icons";
import { useState } from "react";
import { register } from "../actions";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [viewPassword, setViewPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handlerSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      setLoading(true);
      const result = await register(formData);
      if (result.error) {
        setError(result.error);
        return setLoading(false);
      }
      router.push("/login");
      setLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  }

  return (
    <div className="w-[400px] bg-white rounded-md shadow-md px-12 py-8 flex flex-col items-center border border-gray-300">
      <h3 className="text-xl font font-semibold">Create an account</h3>
      <h4 className="text-sm font-light mt-2">
        Create a new account to gain full access
      </h4>
      <form onSubmit={handlerSubmit} className="mt-4 w-full">
        <div className="flex flex-col mt-2">
          <div className="border border-gray-300 p-2 rounded-md bg-gray-100 flex gap-2 items-center">
            <IconAvatar className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              name="name"
              placeholder="Enter you name"
              className=" focus:outline-none bg-gray-100 text-xs placeholder:text-xs"
            />
          </div>
          <div className="border border-gray-300 p-2 rounded-md bg-gray-100 flex gap-2 items-center mt-6">
            <IconAvatar className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              className=" focus:outline-none bg-gray-100 text-xs placeholder:text-xs"
            />
          </div>
          <div className="border border-gray-300 p-2 rounded-md bg-gray-100 flex gap-2 items-center mt-6">
            <IconAvatar className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              name="username"
              placeholder="Create a username"
              className=" focus:outline-none bg-gray-100 text-xs placeholder:text-xs"
            />
          </div>
          <div className="border border-gray-300 p-2 rounded-md bg-gray-100 flex gap-2 items-center mt-6">
            <IconMail className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              name="email"
              placeholder="Enter your mail"
              className=" focus:outline-none bg-gray-100 text-xs placeholder:text-xs"
            />
          </div>
          <div className="border border-gray-300 p-2 rounded-md bg-gray-100 flex gap-2 items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <IconLock className="w-5 h-5 text-gray-600" />
              <input
                type={"password"}
                name="password"
                placeholder="Create a password"
                className="focus:outline-none bg-gray-100 text-xs placeholder:text-xs"
              />
            </div>
            { <IconEye
              open={viewPassword.password}
              className="w-4 h-4 cursor-pointer text-gray-600"
              onClick={() =>
                setViewPassword({
                  ...viewPassword,
                  password: !viewPassword.password,
                })
              }
            /> }
          </div>
          <div className="border border-gray-300 p-2 rounded-md bg-gray-100 flex gap-2 items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <IconLock className="w-5 h-5 text-gray-600" />
              <input
                type={"password"}
                name="confirm-password"
                placeholder="Confirm your password"
                className="focus:outline-none bg-gray-100 text-xs placeholder:text-xs"
              />
            </div>
            { <IconEye
              open={viewPassword.confirmPassword}
              className="w-4 h-4 cursor-pointer text-gray-600"
              onClick={() =>
                setViewPassword({
                  ...viewPassword,
                  confirmPassword: !viewPassword.confirmPassword,
                })
              }
            /> }
          </div>

          <button
            type="submit"
            className={"bg-neutral-700 text-white font-semibold p-2 rounded-md mt-10 hover:bg-neutral-500 flex items-center justify-center"}
          >
             {loading ? (
              <IconLoading className="w-5 h-5 text-white animate-spin" />
            ) : ( 
              "Register"
             )}
          </button>
           {error && <span className="text-red-500 text-xs">{error}</span>} 
        </div>
        <p className="text-sm font-light mt-6 text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="font-bold hover:text-gray-500">
            Go to Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
