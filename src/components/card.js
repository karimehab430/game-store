import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../redux/favoriteSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";

const Carddd = React.memo(({ game }) => {
  const { background_image, name, id, released, genres, rating } = game;

  const games = useSelector((state) => state.favorites.value);
  const dispatch = useDispatch();
  const isFavorite = games.some((item) => item.id === id);

  const ratingColor = (rating) => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-yellow-400";
    return "bg-red-500";
  };

  const handleFavorites = (e) => {
    e.preventDefault();
    isFavorite ? dispatch(remove(game)) : dispatch(add(game));
  };

  const generateGenreLink = (genre) =>
    genre.toLowerCase() === "rpg"
      ? "/role-playing-games-rpg"
      : `/${genre.toLowerCase()}`;

  return (
    <Link
      to={`/games/${id}`}
      className="group relative bg-[#151515] rounded-xl overflow-hidden 
                 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <img
          src={background_image}
          alt={name}
          loading="lazy"
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <span
          className={`absolute bottom-3 left-3 px-2 py-1 text-xs font-semibold text-black rounded ${ratingColor(
            rating
          )}`}
        >
          ⭐ {rating}
        </span>

        <button
          onClick={handleFavorites}
          className="absolute top-3 right-3 bg-black/60 backdrop-blur 
                     p-2 rounded-full text-white hover:scale-110 transition"
        >
          <FontAwesomeIcon
            icon={isFavorite ? filledHeart : unfilledHeart}
            className={isFavorite ? "text-red-500" : ""}
          />
        </button>
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold text-[#f4f4f4] line-clamp-2">
          {name}
        </h2>

        <p className="text-sm text-gray-400">
          Released: <span className="text-gray-200">{released}</span>
        </p>

        <div className="flex flex-wrap gap-2 text-sm">
          {genres?.slice(0, 3).map((genre) => (
            <Link
              key={genre.id}
              to={generateGenreLink(genre.name)}
              className="px-2 py-1 bg-zinc-800 text-gray-200 rounded-md hover:bg-zinc-700 transition"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>
    </Link>
  );
});

export default Carddd;