import React from "react";
import { useSelector } from "react-redux";
import Carddd from "../components/card";

const FavouritesPage = () => {
  const games = useSelector((state) => state.favorites.value);

  if (games.length === 0) {
    return (
      <div className="flex justify-center items-center text-5xl text-[#f4f4f4] text-bold">
        <p>Start adding games!</p>
      </div>
    );
  } else {
    return (
      <div>
        <div className="p-4">
          <h1 className="text-4xl font-bold pt-20 text-[#f4f4f4] flex pb-2">
            Favorites
          </h1>
          <div
            className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 
          max-w-sm mx-auto md:max-w-none md:mx-0"
          >
            {games.map((game) => {
              return <Carddd key={game.id} game={game} />;
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default FavouritesPage;
