import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./search";
import { IoLogoGameControllerB } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { TfiMenu } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isGenresDropdownOpen, setIsGenresDropdownOpen] = useState(false);

  const handleClick = () => {
    setMenu(!menu);
  };
  const closeMenu = () => {
    setMenu(false);
  };

  const handleSearchIconClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
    setIsGenresDropdownOpen(false);
  };

  const handleSearchClose = () => {
    setIsSearchExpanded(false);
  };

  const handleGenresDropdownToggle = () => {
    setIsGenresDropdownOpen(!isGenresDropdownOpen);
  };

  return (
    <div className="fixed z-40 shadow-xl w-full text-[#f4f4f4]">
      <div className="flex flex-row py-2 bg-[#202020]">
        <Link
          to="/"
          className="text-[#f4f4f4] font-bold rounded-md px-3 py-2 text-xl"
        >
          <div className="flex flex-row items-center cursor-pointer px-2">
            <span>
              <IoLogoGameControllerB color="rgb(221, 221, 221)" size={44} />
            </span>
            <h1 className="text-2xl font-bold ml-2 text-red-700">Game Store</h1>
          </div>
        </Link>
        <nav className="hidden md:flex flex-row items-center text-lg font-medium">
          <div className="relative group">
            <div
              className={`flex items-center gap-1 hover:bg-[#ddd]/10 rounded-md mx-2 px-2 py-2 ${
                isGenresDropdownOpen ? "bg-[#ddd]" : ""
              }`}
              onClick={handleGenresDropdownToggle}
            >
              <div className="rounded-md transition-all cursor-pointer text-[#f4f4f4] text-xl font-bold">
                Genres
              </div>
              <BiChevronDown
                className="cursor-pointer text-[#f4f4f4]"
                size={25}
              />
            </div>

            <ul
              className={`absolute py-2 ${
                isGenresDropdownOpen ? "block" : "hidden"
              } z-10 group-hover:block bg-[#202020] text-[#f4f4f4] border
                 border-gray-400/20 rounded-lg p-3`}
            >
              <li className="hover:bg-[#ddd]/10  rounded-md w-full">
                <Link
                  to="/role-playing-games-rpg"
                  className="block w-full p-2 transition-all cursor-pointer"
                >
                  RPG
                </Link>
              </li>
              <li className="hover:bg-[#ddd]/10  rounded-md w-full">
                <Link
                  to="/action"
                  className="block w-full p-2 transition-all cursor-pointer"
                >
                  Action
                </Link>
              </li>
              <li className="hover:bg-[#ddd]/10  rounded-md w-full">
                <Link
                  to="/shooter"
                  className="block w-full p-2 transition-all cursor-pointer"
                >
                  Shooter
                </Link>
              </li>
              <li className="hover:bg-[#ddd]/10  rounded-md w-full">
                <Link
                  to="/adventure"
                  className="block w-full p-2  transition-all cursor-pointer"
                >
                  Adventure
                </Link>
              </li>

              <li className="hover:bg-[#ddd]/10  rounded-md w-full">
                <Link
                  to="/puzzle"
                  className="block w-full p-2  transition-all cursor-pointer"
                >
                  Puzzle
                </Link>
              </li>
              <li className="hover:bg-[#ddd]/10  rounded-md w-full">
                <Link
                  to="/strategy"
                  className="block w-full p-2  transition-all cursor-pointer"
                >
                  Strategy
                </Link>
              </li>
              <li className="hover:bg-[#ddd]/10  rounded-md w-full">
                <Link
                  to="/racing"
                  className="block w-full p-2  transition-all cursor-pointer"
                >
                  Racing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Link
              to="/platforms"
              className="text-[#f4f4f4] font-bold hover:bg-[#ddd]/10 px-3 py-2 rounded-md text-xl"
            >
              Platforms
            </Link>
          </div>
          <div>
            <Link
              to="/favorites"
              className="text-[#f4f4f4] font-bold hover:bg-[#ddd]/10 px-3 py-2 rounded-md text-xl"
            >
              Favorites
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleClick} />
            ) : (
              <TfiMenu size={25} onClick={handleClick} />
            )}
          </div>
        </nav>
        <div className="flex items-center ml-auto px-5">
          <Search
            isExpanded={isSearchExpanded}
            onSearchIconClick={handleSearchIconClick}
            onSearchClose={handleSearchClose}
          />
        </div>

        <div className="md:hidden flex items-center gap-x-5 px-5 text-[#f4f4f4]">
          {menu ? (
            <AiOutlineClose size={25} onClick={handleClick} />
          ) : (
            <TfiMenu size={25} onClick={handleClick} />
          )}
        </div>
      </div>

      <div
        className={` ${
          menu ? "right-0" : "-right-full"
        } w-full fixed py-5 top-0 h-full md:w-[35vw]
        transition-all duration-300 px-4 z-20 bg-[#202020] text-[#f4f4f4]`}
      >
        <nav
          className="flex flex-col overflow-y-auto h-[520px] gap-y-2
      overflow-x-hidden"
        >
          <div className="flex items-center justify-end py-6">
            <div className="flex items-center justify-center w-8 h-8 cursor-pointer">
              <AiOutlineClose size={25} onClick={handleClick} />
            </div>
          </div>
          <ul className="flex flex-col items-center">
            <Link
              onClick={closeMenu}
              to="/role-playing-games-rpg"
              className="text-[#f4f4f4] font-semibold hover:bg-[#ddd]/10 px-3 py-2 rounded-md text-xl "
            >
              RPG
            </Link>
            <Link
              onClick={closeMenu}
              to="/shooter"
              className="text-[#f4f4f4] font-semibold hover:bg-[#ddd]/10 px-3 py-2 rounded-md text-xl "
            >
              SHOOTER
            </Link>
            <Link
              onClick={closeMenu}
              to="/action"
              className="text-[#f4f4f4] font-semibold hover:bg-[#ddd]/10 px-3 py-2 rounded-md text-xl "
            >
              ACTION
            </Link>
            <Link
              onClick={closeMenu}
              to="/adventure"
              className="text-[#f4f4f4] font-semibold hover:bg-[#ddd]/10 px-3 py-2 rounded-md text-xl "
            >
              ADVENTURE
            </Link>
            <Link
              onClick={closeMenu}
              to="/puzzle"
              className="text-[#f4f4f4] font-semibold hover:bg-[#ddd]/10 px-3 py-2 rounded-md text-xl "
            >
              PUZZLE
            </Link>
            <Link
              onClick={closeMenu}
              to="/sports"
              className="text-[#f4f4f4] font-semibold hover:bg-[#ddd]/10 px-3 py-2 rounded-md text-xl "
            >
              SPORTS
            </Link>
            <Link
              onClick={closeMenu}
              to="/strategy"
              className="text-[#f4f4f4] font-semibold hover:bg-[#ddd]/10 px-3 py-2 rounded-md text-xl "
            >
              STRATEGY
            </Link>
            <Link
              onClick={closeMenu}
              to="/racing"
              className="text-[#f4f4f4] font-semibold hover:bg-[#ddd]/10 px-3 py-2 rounded-md text-xl "
            >
              RACING
            </Link>
            <Link
              to="/platforms"
              className="text-[#f4f4f4] font-semibold hover:bg-[#ddd]/10 px-3 py-2 rounded-md text-xl uppercase"
            >
              Platforms
            </Link>
            <Link
              to="/favorites"
              className="text-[#f4f4f4] font-semibold hover:bg-[#ddd]/10 px-3 py-2 rounded-md text-xl uppercase"
            >
              Favorites
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
