import React from "react";
import { useSelector } from "react-redux";
import Carddd from "../components/card";

const FavouritesPage = () => {
  const games = useSelector((state) => state.favorites.value);

  if (games.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-5xl text-slate-200 text-bold">
        <p>Start adding games!</p>
      </div>
    );
  } else {
    return (
      <div className="h-screen mt-5">
        <div className="flex flex-wrap justify-center gap-10">
          {games.map((game) => {
            return <Carddd key={game.id} game={game} />;
          })}
        </div>
      </div>
    );
  }
};

export default FavouritesPage;
