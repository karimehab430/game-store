import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Platforms = () => {
  const [platforms, setPlatforms] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/platforms?key=17bbcccaf5c34efb8a9e96f0b767c795`
    )
      .then((response) => response.json())
      .then((data) => setPlatforms(data))
      .catch((error) => console.error(error));
  }, []);


  return (
    <div className="min-h-screen px-2 py-24 flex flex-col text-3xl text-[#f4f4f4] bg-[#151515]">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 
          max-w-sm mx-auto md:max-w-none md:mx-0 cursor-pointer"
      >
        {platforms &&
          platforms.results &&
          platforms.results.map((platform) => (
            <Link key={platform.id} to={`/platforms/${platform.id}`}>
              <div className="relative group">
                <img
                  src={platform.image_background}
                  alt=""
                  className="w-full h-44 object-cover opacity-50 group-hover:opacity-70 rounded-lg"
                />
                <span className="absolute inset-0 flex items-center justify-center font-bold text-[#f4f4f4]">
                  {platform.name}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-2 text-left opacity-80 group-hover:opacity-100">
                  <div className="font-medium text-lg text-[#f4f4f4]">
                    <span>Game Count:</span> <span>{platform.games_count}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Platforms;
