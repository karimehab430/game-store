import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Arrow } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "../App.css";
import "../color.css";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../redux/favoriteSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../fontStyle.css";

const PathColor = (title) => {
  let color = "";
  switch (title) {
    case "exceptional":
      color = "#83c63c";
      break;
    case "recommended":
      color = "#5375da";
      break;
    case "meh":
      color = "#f9ae46";
      break;
    case "skip":
      color = "red";
      break;
    default:
      color = "#151515";
  }

  return color;
};

const GamePage = () => {
  const params = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState(null);
  const plugins = [new Arrow({ prevElSelector: ".flicking-arrow-prev" })];
  const games = useSelector((state) => state.favorites.value);
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState(" Add to Favorites");

  const isFavorite = games.find((item) => item.id === game.id);

  const handleFavorites = (e) => {
    e.preventDefault();
    if (!isFavorite) {
      dispatch(add(game));
      setButtonText(" Remove from Favorites");
    } else {
      dispatch(remove(game));
      setButtonText(" Add to Favorites");
    }
  };
  useEffect(() => {
    isFavorite
      ? setButtonText(" Remove from Favorites")
      : setButtonText(" Add to Favorites");
  }, [isFavorite]);

  const apiKey = "2705c59b51ea4036bf6f6bed038c95ee";

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games/${params.id}?key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setGame(data))
      .catch((error) => console.error(error));

    fetch(
      `https://api.rawg.io/api/games/${params.id}/screenshots?key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setScreenshots(data))
      .catch((error) => console.error(error));
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  const {
    name,
    description_raw,
    genres,
    metacritic,
    released,
    platforms,
    developers,
    website,
    esrb_rating,
    tags,
    publishers,
    ratings,
  } = game;

  return (
    <div className="">
      <div className="flex flex-col gap-3 items-start mx-5">
        <Flicking
          align="center"
          defaultIndex={0}
          circular={true}
          plugins={plugins}
          inputType={["touch", "mouse"]}
        >
          {screenshots &&
            screenshots.results.map((screenshot) => {
              return (
                <div key={screenshot.id} className="mx-2 mb-5">
                  <img
                    className="lg:w-[1024px] lg:h-[600px] sm:w-[500px] sm:h-[320px]"
                    src={screenshot.image}
                    alt=""
                  />
                </div>
              );
            })}
          <ViewportSlot>
            <div>
              <span className="flicking-arrow-prev is-thin"></span>
              <span className="flicking-arrow-next is-thin"></span>
            </div>
          </ViewportSlot>
        </Flicking>
        <div className="lg:max-w-[1024px]">
          <div className="flex flex-col items-start mb-5">
            <div className="flex flex-row">
              {name && (
                <h1
                  className="text-5xl font-bold mb-2 text-white"
                  style={{ fontFamily: "TiemposHeadlineWeb" }}
                >
                  {name}
                </h1>
              )}
              <div className="p-6 pt-1 relative">
                <button
                  className="rounded bg-red-600 px-6 pb-2 pt-2.5 text-l font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  type="button"
                  data-ripple-light="true"
                  onClick={handleFavorites}
                >
                  {isFavorite ? (
                    <FontAwesomeIcon icon={filledHeart} />
                  ) : (
                    <FontAwesomeIcon icon={unfilledHeart} />
                  )}
                  {buttonText}
                </button>
              </div>
            </div>
            <p className="text-xl text-gray-300/25 font-bold mb-5 flex flex-start">
              {esrb_rating.name}
            </p>
            {metacritic && (
              <>
                <h2 className="text-xl font-old mt-1 mb-2 text-white ">
                  Metacritic Score
                </h2>
                <p className="bg-[#00ce7a] box-border p-3 border-1 h-16 w-16 text-4xl font-bold text-[#262626]">
                  {metacritic}
                </p>
              </>
            )}
          </div>
          <div className="">
            <section className="flex-1">
              {description_raw && (
                <>
                  <h2 className="text-2xl font-semibold mb-2 text-white flex">
                    About
                  </h2>
                  <hr className="mb-5 border-neutral-400 border-[2px]" />
                  <p className="text-lg text-[#9CA3AF]/75 font-thin mb-5">
                    {description_raw}
                  </p>
                </>
              )}
            </section>
            <section className="flex-1">
              <h2 className="text-2xl font-semibold mb-2 text-white flex">
                Game Details
              </h2>
              <hr className="mb-5 border-neutral-400 border-[2px]" />
              <ul className="flex flex-col gap-3">
                <li className="flex gap-2 items-center">
                  <h3 className="text-lg  text-[#9CA3AF]">Genres:</h3>
                  <p className="text-md text-white font-thin ">
                    {genres.map((genre) => genre.name).join(", ")}
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <h3 className="text-lg  text-[#9CA3AF]">Release Date:</h3>
                  <p className="text-md text-white font-thin">{released}</p>
                </li>
                <li className="flex gap-2 items-center">
                  <h3 className="text-lg  text-[#9CA3AF]">Platforms:</h3>
                  <p className="text-md text-white font-thin">
                    {platforms.map(({ platform }) => platform.name).join(" | ")}
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <h3 className="text-lg  text-[#9CA3AF]">Developers:</h3>
                  <p className="text-md text-white font-thin">
                    {developers.map((dev) => dev.name).join(", ")}
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <h3 className="text-lg  text-[#9CA3AF]">Publisher:</h3>
                  <p className="text-md text-white font-thin">
                    {publishers.map((publisher) => publisher.name).join(", ")}
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <h3 className="text-lg  text-[#9CA3AF]">Website:</h3>
                  <a
                    href={`${website}`}
                    className="text-md text-white underline"
                    target="_blank"
                  >
                    Official Website
                  </a>
                </li>
                {platforms
                  .filter(
                    (platform, index, self) =>
                      index === self.findIndex((p) => p.id === platform.id)
                  )
                  .map((platform) =>
                    platform.requirements.minimum &&
                    platform.requirements.recommended ? (
                      <li className="flex gap-2" key={platform.id}>
                        <h3 className="text-md text-[#9CA3AF]">
                          Requirements:
                        </h3>
                        <div className="flex flex-col">
                          <div className="flex gap-2">
                            <p className="text-md text-white font-thin">
                              {platform.requirements.minimum}
                            </p>
                            <p className="text-md text-white font-thin">
                              {platform.requirements.recommended}
                            </p>
                          </div>
                        </div>
                      </li>
                    ) : null
                  )}

                <li className="flex gap-2 mb-4 mt-3">
                  <h3 className="text-lg  text-[#9CA3AF]">Tags:</h3>
                  <p className="text-md text-white font-thin">
                    {tags.map((tag) => tag.name).join(", ")}
                  </p>
                </li>
              </ul>
            </section>
            <section className="flex-1">
              <h2 className="text-2xl font-semibold mb-2 text-white flex">
                Ratings
              </h2>
              <hr className="mb-5 border-neutral-400 border-[2px]" />
              <div className="flex justify-center	">
                {ratings.map((rating) => (
                  <div key={rating.id} className="mb-3 mr-5">
                    <div style={{ width: "200", height: "100" }}>
                      <CircularProgressbarWithChildren
                        value={rating.percent}
                        strokeWidth={2}
                        styles={buildStyles({
                          pathColor: PathColor(rating.title),
                        })}
                      >
                        <div
                          style={{
                            color: "white",
                            fontSize: 12,
                            marginTop: -5,
                          }}
                        >
                          <p className="font-semibold text-xl text-white">
                            {rating.percent}%
                          </p>
                          <p className="font-semibold text-lg text-white">
                            {rating.title}
                          </p>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
