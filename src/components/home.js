import React, { useState, useEffect } from "react";
import Carddd from "./card";
import Carousel from "./carousel";

const today = new Date();
const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
const inSixMonths = new Date(today);
inSixMonths.setMonth(today.getMonth() + 6);

const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
const formattedSixMonthsAgo = `${sixMonthsAgo.getFullYear()}-${(
  sixMonthsAgo.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${sixMonthsAgo.getDate().toString().padStart(2, "0")}`;

const formattedInSixMonths = `${inSixMonths.getFullYear()}-${(
  inSixMonths.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${inSixMonths.getDate().toString().padStart(2, "0")}`;

const Home = () => {
  const [games, setGames] = useState([]);
  const [acclaimedGames, setAcclaimedGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);

  const apiKey = "2705c59b51ea4036bf6f6bed038c95ee";

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&dates=${formattedSixMonthsAgo},${formattedToday}&metacritic=65,100&&ordering=-released&page_size=20`
    )
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((error) => console.error(error));

    fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&ordering=-"metacritic"&metacritic=90,100`
    )
      .then((res) => res.json())
      .then((data) => setAcclaimedGames(data))
      .catch((error) => console.error(error));

      fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=${formattedToday},${formattedInSixMonths}&page_size=4&ordering=released`)

        .then((res) => res.json())
        .then((data) => setUpcomingGames(data))
        .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen">
      <Carousel />
      <div className="flex flex-col items-center">
        <div className="pt-4 lg:w-[1200px] sm:w-[600px] px-2 mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-white flex pb-2">
            New Releases
          </h2>
          <hr className=" border-neutral-400 border-[2px] " />
          <div className="flex flex-wrap justify-center gap-10 mt-20">
            {games.results &&
              games.results.map((game) => {
                return <Carddd key={game.id} game={game} />;
              })}
          </div>
        </div>
        <div className="pt-4 lg:w-[1200px] sm:w-[600px] px-2 mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-white flex pb-2">
            Critically Acclaimed
          </h2>
          <hr className=" border-neutral-400 border-[2px] " />
          <div className="flex flex-wrap justify-center gap-10 mt-20">
            {acclaimedGames.results &&
              acclaimedGames.results.map((game) => {
                return <Carddd key={game.id} game={game} />;
              })}
          </div>
        </div>
        <div className="pt-4 lg:w-[1200px] sm:w-[600px] px-2 mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-white flex pb-2">
            Upcoming
          </h2>
          <hr className=" border-neutral-400 border-[2px] " />
          <div className="flex flex-wrap justify-center gap-10 mt-20">
            {upcomingGames.results &&
              upcomingGames.results.map((game) => {
                return <Carddd key={game.id} game={game} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
