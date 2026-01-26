import Image from "next/image";
import logo from "@/public/nashlogo.png";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="max-w-6xl w-full mx-auto flex items-center justify-between px-5 py-4">
      {/* nav item */}
      <ul className="flex gap-4 text-base">
        <li className="">Home</li>
        <li>Course</li>
        <li>Review</li>
      </ul>
      {/*  */}
      <div className="flex  items-center justify-center">
        <Image src={logo} alt="logo" width={55} height={55} />
        <h2 className="font-bold text-xl font-roboto ">Nashles</h2>
      </div>
      <div className="gap-4 flex">
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
