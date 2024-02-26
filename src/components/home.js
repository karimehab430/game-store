import React, { useState, useEffect } from "react";
import Carddd from "./card";
import Carousel from "./carousel";
import { GiFlame } from "react-icons/gi";

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

  const apiKey = "17bbcccaf5c34efb8a9e96f0b767c795";

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

    fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&dates=${formattedToday},${formattedInSixMonths}&page_size=4&ordering=released`
    )
      .then((res) => res.json())
      .then((data) => setUpcomingGames(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen">
      <Carousel />
      <div className="flex flex-col justify-start ">
        <div className="px-2 pt-8 mb-4 mx-4">
          <div className="flex flex-row">
          <h1 className="text-4xl font-semibold mb-2 text-[#f4f4f4] flex pb-2 mr-3">
            Hot Games
          </h1>
          <GiFlame size={36} color="orange" /></div>
          <div
            className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 
          max-w-sm mx-auto md:max-w-none md:mx-0"
          >
            {games.results &&
              games.results.map((game) => {
                return <Carddd key={game.id} game={game} />;
              })}
          </div>
        </div>
        <div className="px-2 mb-4 mx-4 py-10">
          <h1 className="text-4xl font-semibold mb-2 text-[#f4f4f4] flex pb-2">
            Critically Acclaimed
          </h1>
          <div
            className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 
          max-w-sm mx-auto md:max-w-none md:mx-0"
          >
            {acclaimedGames.results &&
              acclaimedGames.results.map((game) => {
                return <Carddd key={game.id} game={game} />;
              })}
          </div>
        </div>
        <div className="px-2 mb-4 mx-4">
          <h1 className="text-4xl font-semibold mb-2 text-[#f4f4f4] flex pb-2">
            Upcoming
          </h1>
          <div
            className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 
          max-w-sm mx-auto md:max-w-none md:mx-0"
          >
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
