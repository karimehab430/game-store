import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carddd from "../components/card";

const GenrePage = () => {
  const { gameGenre } = useParams();
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const apiKey = "17bbcccaf5c34efb8a9e96f0b767c795";

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&genres=${gameGenre}&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error(error));
  }, [gameGenre, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-24 mx-5">
      <h1 className="text-[#f4f4f4] font-bold text-4xl capitalize">{gameGenre}</h1>
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
