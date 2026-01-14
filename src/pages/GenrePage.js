import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Carddd from "../components/card";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
const GenrePage = () => {
  const { gameGenre } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchGenre = async (genre, page) => {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&genres=${genre}&page=${page}`
    );
    if (!res.ok) throw new Error("Failed to fetch games");

    return res.json();
  };
  const {
    data: games,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["games-by-genre", gameGenre, currentPage],
    queryFn: () => fetchGenre(gameGenre, currentPage),
    keepPreviousData: true,
  });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="w-16 h-16" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Error loading games.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 mx-5">
      <h1 className="text-[#f4f4f4] font-bold text-4xl capitalize">
        {gameGenre}
      </h1>
      <div
        className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 
          max-w-sm mx-auto md:max-w-none md:mx-0"
      >
        {games.results &&
          games.results.map((game) => <Carddd key={game.id} game={game} />)}
      </div>
      <div className="flex justify-center mt-5">
        {currentPage > 1 && (
          <button
            className="px-4 py-2 mx-2 mb-4 text-[#f4f4f4] bg-blue-500 rounded"
            onClick={handlePreviousPage}
          >
            Previous Page
          </button>
        )}
        {games.next && (
          <button
            className="px-4 py-2 mx-2 mb-4 text-[#f4f4f4] bg-blue-500 rounded"
            onClick={handleNextPage}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
