import React, { useState, useEffect } from "react";
import { MdLightMode } from "react-icons/md";

import { Link } from "react-router-dom";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {

    setIsDarkMode((prevMode) => !prevMode);
  };

  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  

  return (
    <header>
      <nav className="w-full Header flex justify-between items-center pt-8 pb-8">
        <div className="text-xl">
          <a href="/">
            <h1 className="font-medium dark:text-white">
              <strong className="text-[#2a68ff] font-extrabold mr-0.5">Job</strong>Portal
            </h1>
          </a>
        </div>
        <ul className="hidden sm:flex items-center gap-2">
            <li className="text-[#6f6f6f] dark:text-slate-100 text-base hover:text-[#2a68ff]">
              <Link to='/login' jo>Login</Link>
            </li>
            <li className="text-[#6f6f6f] dark:text-slate-100 text-base hover:text-[#2a68ff]">
              <Link to='/signup'>Signup</Link>
            </li>
        </ul>
        <div className="absolute right-20">
          <MdLightMode
            onClick={toggleTheme}
            className={`${
              isDarkMode ? "dark:invert" : ""
            } h-5 w-full sm:hidden`}
          />
        </div>
        <div className="flex leading-4 flex-col gap-1 sm:hidden">
          <div className="h-[3px] dark:bg-slate-100 bg-black w-8"></div>
          <div className="h-[3px] dark:bg-slate-100 bg-black w-8"></div>
          <div className="h-[3px] dark:bg-slate-100 bg-black w-8"></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
