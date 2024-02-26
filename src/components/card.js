import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../redux/favoriteSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";

const Carddd = ({ game }) => {
  const { background_image, name, id, released, genres, rating } = game;
  const [buttonText, setButtonText] = useState("Add to Favorites");

  const PathColor = (rating) => {
    let color = "";
    if (rating <= 5 && rating > 3.5) color = "#66FF00";
    if (rating <= 3.5 && rating >= 3) color = "#FFFF33";
    if (rating < 3) color = "red";

    return color;
  };

  const games = useSelector((state) => state.favorites.value);
  const dispatch = useDispatch();

  const isFavorite = games.find((item) => item.id === game.id);

  const handleFavorites = (e) => {
    e.preventDefault();
    if (!isFavorite) {
      dispatch(add(game));
      setButtonText(" Remove from Favorites");
    } else {
      dispatch(remove(game));
      setButtonText(" Add to Favorites");
    }
  };

  useEffect(() => {
    isFavorite
      ? setButtonText(" Remove from Favorites")
      : setButtonText(" Add to Favorites");
  }, [isFavorite]);

  const generateGenreLink = (genre) => {
    if (genre.toLowerCase() === "rpg") {
      return "/role-playing-games-rpg";
    } else {
      return `/${genre.toLowerCase()}`;
    }
  };

  return (
    <Link
      to={`/games/${id}`}
      className="border border-zinc-800 shadow-lg rounded-lg overflow-hidden hover:scale-105 z-1 hover:z-10 transition bg-[#151515]"
    >
      <img
        className="rounded-lg w-full h-44 object-cover "
        alt="game-thumbnail"
        src={background_image}
      />
      <div className="space-y-4 p-3 w-full">
        <h2 className="font-bold flex justify-center items-center text-2xl pt-2 text-[#f4f4f4] hover:text-[#f4f4f4]/50">
          {name}
        </h2>
        <div className="text-yellow-500 flex flex-start">
          <h4 className="mx-1 font-medium text-[#f4f4f4]">Release Date:</h4>
          <span className="text-yellow-500 font-semibold">{released}</span>
        </div>
        <div className="text-[#f4f4f4] flex flex-start">
          <h4 className="mx-1 font-medium">Genres:</h4>
          {genres &&
          genres.map((genre, index) => (
            <div key={genre.id}>
              {index > 0 && ", "}
              <Link to={generateGenreLink(genre.name)} className=" hover:underline">{genre.name}</Link>
            </div>
          ))}
        </div>
        <div className="text-[#f4f4f4] flex flex-start">
          <h4 className="mx-2 font-medium">Rating:</h4>
          <span className="font-semibold" style={{ color: PathColor(rating) }}>{rating}</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <button
            className="text-[#f4f4f4] font-medium px-5 py-2 mb-3 bg-red-500 
            transition-all rounded-md hover:bg-red-600"
            type="button"
            data-ripple-light="true"
            onClick={handleFavorites}
          >
            {isFavorite ? (
              <FontAwesomeIcon icon={filledHeart} />
            ) : (
              <FontAwesomeIcon icon={unfilledHeart} />
            )}
            {buttonText}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Carddd;
