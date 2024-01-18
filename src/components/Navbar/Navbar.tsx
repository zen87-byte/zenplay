import React, { useState } from "react";
import Link from "next/link";
import Searchbar from "../../pages/[search]/Searchbar";
import { usePathname } from "next/navigation";
import { getGenre } from "../../utils/getGenre";
import { getQuerySearch } from "../../utils/getQuerySearch";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

const menuList: string[] = [
  "Home",
  "Categories",
  "Watchlist",
  "Movies",
  "Series",
];

export function Navbar() {
  const pathname: string = usePathname();
  const isHome: string = "/";
  const [isLogin, setIsLogin] = useState<boolean>(false);
  // const data = getGenre({ endpoint: "genre/tv/list" })
  return (
    <nav
      className={`${
        pathname === isHome ? "absolute" : "absolute"
      } block z-30 w-full flex justify-between items-center py-4 px-16`}
    >
      <div className="logo">
        <Link href="/">
          {/* <Image src={logo} alt="" width={200} height={50} /> */}
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
        {isLogin ? (
          <>
            <button>
              <IoMdNotificationsOutline className="w-8 h-8" />
            </button>
            <button>
              <FaRegUserCircle className="w-8 h-8" />
            </button>
          </>
        ) : (
          <button
            className="bg-white text-black py-1 px-4 rounded-xl"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
