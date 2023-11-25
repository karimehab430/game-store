import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "./search";
import { useMediaQuery } from "react-responsive";
import Icon from "@mdi/react";
import { mdiMenu, mdiClose } from "@mdi/js";

const Navbar = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setIsMobileMenuOpen(isMobile);
  }, [isMobile]);

  const handleSearchIconClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
    setIsMobileMenuOpen(false);
  };

  const handleSearchClose = () => {
    setIsSearchExpanded(false);
  };

  const handleHamburgerClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchExpanded(false);
  };

  return (
    <div className="relative bg-neutral-800">
      {isMobile && isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#1e2124] z-50">
          <div className="flex justify-end p-4">
            <div
              className="text-white cursor-pointer"
              onClick={handleHamburgerClick}
            >
              <Icon path={mdiClose} className="w-6 h-6" />
            </div>
          </div>
          <nav className="flex justify-center items-center h-full">
            <ul className="flex flex-col items-center">
              <Link
                to="/"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl"
              >
                Home
              </Link>
              <Link
                to="/role-playing-games-rpg"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                RPG
              </Link>
              <Link
                to="/shooter"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                SHOOTER
              </Link>
              <Link
                to="/action"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                ACTION
              </Link>
              <Link
                to="/adventure"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                ADVENTURE
              </Link>
              <Link
                to="/puzzle"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                PUZZLE
              </Link>
              <Link
                to="/sports"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                SPORTS
              </Link>
              <Link
                to="/strategy"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                STRATEGY
              </Link>
              <Link
                to="/racing"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                RACING
              </Link>
            </ul>
          </nav>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {isMobile && (
            <div
              className="text-white cursor-pointer"
              onClick={handleHamburgerClick}
            >
              <Icon
                path={isMobileMenuOpen ? mdiClose : mdiMenu}
                className="w-6 h-6"
              />
            </div>
          )}

          <div className={`hidden lg:flex items-center justify-start`}>
            <Link
              to="/"
              className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl"
            >
              Home
            </Link>
            <div className="flex">
              <Link
                to="/role-playing-games-rpg"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                RPG
              </Link>
            </div>
            <div className="flex">
              <Link
                to="/shooter"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                SHOOTER
              </Link>
            </div>
            <div className="flex">
              <Link
                to="/action"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                ACTION
              </Link>
            </div>
            <div className="flex">
              <Link
                to="/adventure"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                ADVENTURE
              </Link>
            </div>
            <div className="flex">
              <Link
                to="/puzzle"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                PUZZLE
              </Link>
            </div>
            <div className="flex">
              <Link
                to="/sports"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                SPORTS
              </Link>
            </div>
            <div className="flex">
              <Link
                to="/strategy"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                STRATEGY
              </Link>
            </div>
            <div className="flex">
              <Link
                to="/racing"
                className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl "
              >
                RACING
              </Link>
            </div>
          </div>

          <Search
            isExpanded={isSearchExpanded}
            onSearchIconClick={handleSearchIconClick}
            onSearchClose={handleSearchClose}
          />

          <div className="flex">
            <Link
              to="/favorites"
              className="text-white font-bold hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl"
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
