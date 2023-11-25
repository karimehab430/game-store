import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = ({ isExpanded, onSearchIconClick, onSearchClose }) => {
  const [searchItem, setSearchItem] = useState("");
  const [results, setResults] = useState([]);

  const apiKey = "2705c59b51ea4036bf6f6bed038c95ee";

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
          <svg
            style={{ color: "white", marginRight: "0.75rem" }}
            width="36"
            height="36"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="48"
              height="48"
            ></rect>
            <path
              d="M14 14L34 34"
              stroke="white"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M14 34L34 14"
              stroke="white"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        ) : (
          <svg
            className={`w-4 h-4  text-gray-500 dark:text-gray-400 mr-2`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        )}
      </div>

      {isExpanded && (
        <div className="relative">
          <input
            type="search"
            id="default-search"
            autoComplete="off"
            className="p-3 w-[300px] mb-1 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search Games"
            required
            value={searchItem}
            onChange={handleChange}
          />
          {searchItem.length > 3 && (
            <div className="text-white bg-neutral-800 z-[102] lg:absolute lg:top-[55px] top-[55px] lg:max-w-[500px]  fixed left-0 lg:left-auto w-4/5 h-full lg:h-auto p-3 animate-openfast flex flex-col rounded">
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
                        <div className="flex cursor-pointer p-2 justify-between border-t-2">
                          <div>
                            <h3 className="font-semibold">
                              {game.name}{" "}
                              {"("}
                              {game.released.split("-")[0]}
                              {")"}
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
