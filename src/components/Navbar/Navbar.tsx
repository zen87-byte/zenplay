import React, { useState } from "react";
import Link from "next/link";
import Searchbar from "../../pages/[search]/Searchbar";
import { usePathname } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { signIn, signOut, useSession } from "next-auth/react";
// import { useAuth } from "@components/auth-provider";

const menuList: string[] = [
  "Home",
  "Categories",
  "Watchlist",
  "Movies",
  "Series",
];

const Navbar: React.FC = () => {
  const pathname: string = usePathname();
  const isSearch: string = "/search";
  console.log("pathname: ", pathname)
  const { data: session } = useSession();
  return (
    <nav
      className={`${
        pathname === isSearch || pathname.includes('all')? "block" : "absolute"
      } block z-30 w-full flex justify-between items-center py-4 px-16`}
    >
      <div className="logo">
        <Link href="/">
          <h1 className="font-black text-4xl">ZENPLAY</h1>
        </Link>
      </div>
      <div>
        <ul className="flex justify-between items-center gap-4">
          {menuList.map((item: string, index: number) => (
            <button key={index}>{item}</button>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 items-center">
        <Searchbar />
        {session ? (
          <>
            <button>
              <IoMdNotificationsOutline className="w-8 h-8" />
            </button>
            <button onClick={() => signOut()}>
              <FaRegUserCircle className="w-8 h-8" />
            </button>
          </>
        ) : (
          <button
            className="bg-white text-black py-1 px-4 rounded-xl"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};


export default Navbar;
