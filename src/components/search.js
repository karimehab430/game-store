import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

const Search = ({ isExpanded, onSearchIconClick, onSearchClose }) => {
  const [searchItem, setSearchItem] = useState("");
  const [results, setResults] = useState([]);

  const apiKey = "17bbcccaf5c34efb8a9e96f0b767c795";

  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    if (searchItem !== "") {
      fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&search=${searchItem}&page_size=5&rating=3.5,5`
      )
        .then((response) => response.json())
        .then((data) => setResults(data.results))
        .catch((error) => console.error(error));
    }
  }, [searchItem]);

  return (
    <div className="relative flex items-center">
      <div
        className="flex items-center cursor-pointer"
        onClick={isExpanded ? onSearchClose : onSearchIconClick}
      >
        {isExpanded ? (
          <AiOutlineClose size={25} className="mx-3" />
        ) : (
          <IoMdSearch size={25} />
        )}
      </div>

      {isExpanded && (
        <div className={`relative ${isExpanded && "w-full"}`}>
        <input
            type="search"
            id="default-search"
            autoComplete="off"
            className="p-3 lg:w-[600px] mb-1 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-[#f4f4f4] focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search Games"
            required
            value={searchItem}
            onChange={handleChange}
          />
          {searchItem.length > 3 && (
            <div className="text-[#f4f4f4] z-10 bg-[#202020] 
            absolute lg:top-[55px] top-[55px] left-0 lg:left-auto w-full
             h-auto p-3 animate-openfast flex flex-col rounded">
              <ul>
                {results &&
                  results.map((game) => (
                    <li
                      key={game.id}
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      <Link to={`/games/${game.id}`}>
                        <div className="flex cursor-pointer p-3 justify-between border-t-2 hover:bg-[#f4f4f4]/5 rounded">
                          <div>
                            <h3 className="font-semibold">
                              {game.name}{" "}
                              {game.released &&
                                "(" + game.released.split("-")[0] + ")"}
                            </h3>
                            <div className="text-neutral-500 flex flex-row  ">
                              {game.genres
                                .map((genre) => genre.name)
                                .join(", ")}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
