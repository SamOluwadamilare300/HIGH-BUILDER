"use client";

import { useState } from "react";
import { X } from "lucide-react";
import MainButton from "./MainButton";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";

function NavBar() {
  const links = [
    {
      route: "/",
      name: "Builders",
      badgeCount: 0,
    },
    {
      route: "/",
      name: "Templates",
      badgeCount: 0,
    },
    {
      route: "/",
      name: "Help",
      badgeCount: 0,
    },
    {
      route: "/",
      name: "Careers",
      badgeCount: 4,
    },
    {
      route: "/",
      name: "Pricing",
      badgeCount: 0,
    },
  ];
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="fixed w-full top-0 z-[9999]"> {/* Changed to fixed and increased z-index */}
      {/* DESKTOP */}
      <div className="hidden rounded-full mt-3 lg:block animate-in fade-in zoom-in bg-white/50 dark:bg-black/80 backdrop-blur-sm p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between mx-4 items-center">
          <div>
          <h1 className=" font-serif italic">
        <span className="text-black font-bold text-3xl">Emd</span>
         <span className="text-gray-500 mx-1"></span>
         <span className="text-gray-600 text-2xl font-medium">Website Builder</span>
          </h1>
          </div>
          <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
            {links.map((item, index) => (
              <div key={index} className="flex gap-2">
                <p
                  className={`hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray dark:text-gray-300`}
                >
                  {item.name}
                </p>
                {item.badgeCount ? (
                  <div className="h-8 w-8 rounded-full bg-primary flex justify-center items-center font-semibold text-white">
                    {item.badgeCount}
                  </div>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-[20px] select-none">
            <Link href="/auth/sign-in">
              <MainButton
                text="Sign in"
                width="contain"
                className="bg-white/90 dark:bg-gray-900/90 border text-[#31373D] dark:text-gray-300 border-[#EDEEF0] dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80"
              />
            </Link>

            <Link href="/auth/sign-up">
              <MainButton text="Start for free" width="contain" />
            </Link>
          </div>
        </div>
      </div>
      {/* MOBILE */}

<div
  className={`block lg:hidden shadow-sm w-full py-4 animate-in fade-in zoom-in ${
    menu 
      ? "bg-white/95 backdrop-blur-sm"  // Changed from bg-primary/90 to white
      : "bg-white/80 backdrop-blur-sm border-b border-gray-200"
  }`}
>
  <div className="flex justify-between mx-[10px]">
    <div className="flex gap-[50px] text-[16px] items-center select-none">
    <h1 className="italic">
        <span className="text-black font-bold text-3xl">Emd</span>
         <span className="text-gray-500 mx-1"></span>
         <span className="text-gray-600 text-sm">Website Builder</span>
          </h1>
    </div>
    <div className="flex items-center gap-[40px]">
      {menu ? (
        <X
          className="cursor-pointer animate-in fade-in zoom-in text-black" // Removed dark:text-white
          onClick={toggleMenu}
        />
      ) : (
        <IoMenu size={45} className="cursor-pointer text-black" // Removed dark:text-white
          onClick={toggleMenu}
        />
      )}
    </div>
  </div>
  {menu ? (
    <div className="my-8 select-none animate-in slide-in-from-right">
      <div className="flex flex-col gap-8 mt-8 mx-4">
        {links.map((item, index) => (
          <div key={index} className="flex gap-2">
            <p
              className={`hover:text-primary cursor-pointer flex items-center gap-2 font-[500] text-gray`} // Removed dark:text-gray-300
            >
              {item.name}
            </p>
            {item.badgeCount ? (
              <div className="h-8 w-8 rounded-full bg-primary flex justify-center items-center font-semibold text-white">
                {item.badgeCount}
              </div>
            ) : (
              <div />
            )}
          </div>
        ))}

        <div className="flex flex-col gap-[20px] select-none">
          <Link href="/auth/sign-in">
            <MainButton
              text="Sign in"
              width="contain"
              className="bg-white/90 text-[#31373D] border-[#EDEEF0] hover:bg-white/80" // Removed dark mode classes
            />
          </Link>

          <Link href="/auth/sign-up">
            <MainButton text="Start for free" width="contain" />
          </Link>
        </div>
      </div>
    </div>
  ) : null}
</div>
    </div>
  );
}

export default NavBar;