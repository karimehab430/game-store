import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carddd from "../components/card";
import LoadingSpinner from "../components/LoadingSpinner";

const apiKey = process.env.REACT_APP_API_KEY;

const fetchPlatformGames = async (platformId, page) => {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${apiKey}&platforms=${platformId}&page=${page}`
  );
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
};

const fetchPlatformDetails = async (platformId) => {
  const res = await fetch(
    `https://api.rawg.io/api/platforms/${platformId}?key=${apiKey}`
  );
  if (!res.ok) throw new Error("Failed to fetch platform details");
  return res.json();
};

const PlatformPage = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: games,
    isLoading: gamesLoading,
    isError: gamesError,
  } = useQuery({
    queryKey: ["platformGames", id, currentPage],
    queryFn: () => fetchPlatformGames(id, currentPage),
    keepPreviousData: true,
  });

  const { data: platform } = useQuery({
    queryKey: ["platformDetails", id],
    queryFn: () => fetchPlatformDetails(id),
  });

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (gamesLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner size="w-16 h-16" />
      </div>
    );
  }

  if (gamesError) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p>Error loading games for this platform.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 mx-5">
      <h1 className="text-[#f4f4f4] font-bold text-4xl capitalize">
        {platform?.name} Games
      </h1>

      <div
        className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 
          max-w-sm mx-auto md:max-w-none md:mx-0"
      >
        {games.results?.map((game) => (
          <Carddd key={game.id} game={game} />
        ))}
      </div>

      <div className="flex justify-center mt-5">
        {currentPage > 1 && (
          <button
            className="px-4 py-2 mx-2 mb-4 text-[#f4f4f4] bg-blue-500 rounded hover:bg-blue-600 transition"
            onClick={handlePreviousPage}
          >
            Previous Page
          </button>
        )}
        {games.next && (
          <button
            className="px-4 py-2 mx-2 mb-4 text-[#f4f4f4] bg-blue-500 rounded hover:bg-blue-600 transition"
            onClick={handleNextPage}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default PlatformPage;