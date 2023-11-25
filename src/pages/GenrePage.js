import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carddd from "../components/card";

const GenrePage = () => {
  const { gameGenre } = useParams();
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const apiKey = "2705c59b51ea4036bf6f6bed038c95ee";

  useEffect(() => {
    fetchGames();
  }, [gameGenre, currentPage]);

  const fetchGames = () => {
    fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&genres=${gameGenre}&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error(error));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {games.results &&
          games.results.map((game) => <Carddd key={game.id} game={game} />)}
      </div>
      <div className="flex justify-center mt-5">
        {currentPage > 1 && (
          <button
            className="px-4 py-2 mx-2 text-white bg-blue-500 rounded"
            onClick={handlePreviousPage}
          >
            Previous Page
          </button>
        )}
        {games.next && (
          <button
            className="px-4 py-2 mx-2 text-white bg-blue-500 rounded"
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
