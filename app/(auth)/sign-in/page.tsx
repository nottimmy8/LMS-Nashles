"use client";

import Image from "next/image";
import emailIcon from "@/public/mail.png";
import eyeIcon from "@/public/show.png";
import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import Link from "next/link";
import googleIcon from "@/public/google-icon.png";
import appleIcon from "@/public/apple.png";

const SignIn = () => {
  return (
    <div className="py-3 grid grid-cols-1 gap-10  pb-15    max-w-lg w-full mx-auto    ">
      <div className="flex flex-col mt-10 border border-primary/50 rounded-xl p-6 ">
        <h1 className="text-center font-medium mb-6  text-black text-[28px]">
          Welcome Back! Sign in to Continue.
        </h1>
        <form className="space-y-5 w-full  ">
          <div>
            <label className="text-sm block mb-2 font-medium text-black">
              Email address
            </label>
            <div className="flex items-center w-full overflow-hidden border border-primary rounded-full">
              <input
                type="text"
                name="email"
                placeholder="Enter Email Address"
                className="w-full py-2.5 px-3 outline-none text-sm text-black "
              />
              <div className="w-12 h-full flex items-center justify-center ">
                <Image src={emailIcon} alt="icon" width={20} height={20} />{" "}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm block mb-2 font-medium text-black">
              Password
            </label>
            <div className="flex items-center w-full overflow-hidden border border-primary rounded-full">
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full py-2.5 px-3 outline-none text-sm text-black "
              />
              <div className="w-12 h-full flex items-center justify-center ">
                <Image src={eyeIcon} alt="icon" width={20} height={20} />{" "}
              </div>
            </div>
          </div>

          <div className=" flex justify-between">
            <Field orientation={"horizontal"} className="w-1/3  ">
              <Checkbox className="border-primary/50" />
              <FieldLabel className="text-gray">Remember me</FieldLabel>
            </Field>

            <p className="text-primary/50  text-sm ">Forgot password</p>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-primary text-white px-4.5 py-2 w-full "
            >
              Create account
            </motion.button>
            {/* <p className="text-sm text-red-600">{error} </p> */}
          </div>
          <p>
            Already have an account?
            <Link href="/sign-up">
              <span className="text-primary/50 ">Sign up</span>{" "}
            </Link>
          </p>
        </form>
        <div className=" inline-flex justify-center items-center gap-4 text-sm mt-6 mb-6">
          <div className="w-full border border-primary" /> or
          <div className="w-full border border-primary" />
        </div>
        <div className="grid grid-cols-1 gap-4 ">
          <button className="flex items-center justify-center px-3 py-2.5 border border-primary rounded-full gap-5 text-base text-gray font-medium ">
            <Image src={googleIcon} alt="google icon" width={25} height={25} />
            Continue with Google
          </button>
          <button className="flex items-center justify-center px-3 py-2.5 border border-primary rounded-full gap-5 text-base text-gray font-medium">
            <Image src={appleIcon} alt="google icon" width={25} height={25} />{" "}
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
