import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../redux/favoriteSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";

const Carddd = ({ game }) => {
  const { background_image, name, id } = game;
  const [buttonText, setButtonText] = useState("Add to Favorites");

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

  return (
    <Link
      to={`/games/${id}`}
      className="rounded-lg bg-neutral-700 w-[256px] relative flex flex-col items-center justify-center"
    >
      <img
        className="rounded-t-lg w-[256px] h-[144px]"
        alt="img-blur-shadow"
        src={background_image}
      />
      <div className="p-6 pt-0 flex-grow relative text-center">
        <h5
          style={{ fontFamily: "TiemposHeadlineWeb" }}
          className="mb-2 mt-3 block text-lg text-white font-semibold tracking-normal text-blue-gray-900"
        >
          {name} {"("}
          {game.released.split("-")[0]}
          {")"}
        </h5>
        <div className="text-slate-200 flex flex-col">
          {game.genres.map((genre) => genre.name).join(", ")}
        </div>
      </div>
      <div className="p-6 pt-0 relative">
        <button
          className="rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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
    </Link>
  );
};

export default Carddd;
