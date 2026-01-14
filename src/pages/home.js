import React from "react";
import { useQueries } from "@tanstack/react-query";
import Carddd from "../components/card";
import Carousel from "../components/carousel";
import LoadingSpinner from "../components/LoadingSpinner";
import { Section } from "../components/Section";

const API_KEY = process.env.REACT_APP_API_KEY;

const formatDate = (date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

const today = new Date();
const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
const inSixMonths = new Date(today);
inSixMonths.setMonth(today.getMonth() + 6);

const fetchGames = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

const Home = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["hot-games"],
        queryFn: () =>
          fetchGames(
            `https://api.rawg.io/api/games?key=${API_KEY}&dates=${formatDate(
              sixMonthsAgo
            )},${formatDate(today)}&page_size=20`
          ),
      },
      {
        queryKey: ["acclaimed-games"],
        queryFn: () =>
          fetchGames(
            `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic&metacritic=90,100`
          ),
      },
      {
        queryKey: ["upcoming-games"],
        queryFn: () =>
          fetchGames(
            `https://api.rawg.io/api/games?key=${API_KEY}&dates=${formatDate(
              today
            )},${formatDate(inSixMonths)}&page_size=4&ordering=released`
          ),
      },
      {
        queryKey: ["carousel-games"],
        queryFn: () =>
          fetchGames(
            `https://api.rawg.io/api/games?key=${API_KEY}&dates=${formatDate(
              sixMonthsAgo
            )},${formatDate(today)}&page_size=10&ordering=-rating`
          ),
      },
    ],
  });

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner size="w-16 h-16" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p>Something went wrong while fetching games.</p>
      </div>
    );
  }

  const [hot, acclaimed, upcoming, carousel] = results.map((r) => r.data);

  return (
    <div className="min-h-screen">
      <Carousel carouselData={carousel.results} />

      <Section title="Hot Games">
        {hot.results?.map((game) => (
          <Carddd key={game.id} game={game} />
        ))}
      </Section>

      <Section title="Critically Acclaimed">
        {acclaimed.results?.map((game) => (
          <Carddd key={game.id} game={game} />
        ))}
      </Section>

      <Section title="Upcoming">
        {upcoming.results?.map((game) => (
          <Carddd key={game.id} game={game} />
        ))}
      </Section>
    </div>
  );
};

export default Home;
