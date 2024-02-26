import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { AiOutlineClose } from "react-icons/ai";

const PathColor = (title) => {
  let color = "";
  switch (title) {
    case "exceptional":
      color = "#66FF00";
      break;
    case "recommended":
      color = "#5375da";
      break;
    case "meh":
      color = "#FFFF33";
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
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const plugins = [new Arrow({ prevElSelector: ".flicking-arrow-prev" })];
  const games = useSelector((state) => state.favorites.value);
  const dispatch = useDispatch();

  const isFavorite = game && games.find((item) => item.id === game.id);

  const openModal = (screenshot) => {
    setSelectedScreenshot(screenshot);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedScreenshot(null);
    setIsModalOpen(false);
  };

  const handleFavorites = (e) => {
    e.preventDefault();
    if (game) {
      if (!isFavorite) {
        dispatch(add(game));
      } else {
        dispatch(remove(game));
      }
    }
  };
  const generateGenreLink = (genre) => {
    if (genre.toLowerCase() === "rpg") {
      return "/role-playing-games-rpg";
    } else {
      return `/${genre.toLowerCase()}`;
    }
  };
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = isModalOpen ? "hidden" : "auto";
    }
  }, [isModalOpen]);

  const apiKey = "17bbcccaf5c34efb8a9e96f0b767c795";

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
  }, [params.id]);

  if (!game) {
    return <div className="bg-[#202020] flex justify-center items-center text-4xl">Loading...</div>;
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
    <div className="bg-[#202020] py-24 lg:py-0">
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
                    className="lg:w-[1024px] lg:h-[600px] w-[360px] h-[200px] cursor-pointer"
                    src={screenshot.image}
                    alt=""
                    onClick={() => openModal(screenshot)}
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
        {isModalOpen && selectedScreenshot && (
          <div className="h-full fixed overflow-hidden top-0 left-0 w-full bg-black bg-opacity-70 z-50 flex items-center justify-center">
            <div className="relative">
              <img
                className="w-full lg:h-[95vh] h-[30vh] "
                src={selectedScreenshot.image}
                alt=""
              />
              <button
                className="absolute top-2 right-2 text-[#f4f4f4] font-bold"
                onClick={closeModal}
              >
                <AiOutlineClose size={28} />
              </button>
            </div>
          </div>
        )}

        <div className="lg:max-w-[1024px]">
          <div className="flex flex-col items-start mb-5">
            <div className="flex flex-row justify-between">
              {name && (
                <h1
                  className="text-5xl font-bold mb-2 text-[#f4f4f4]"
                  style={{ fontFamily: "TiemposHeadlineWeb" }}
                >
                  {name}
                </h1>
              )}
              <div className="ml-4">
                <button
                  className="rounded bg-red-600 hover:bg-red-700 px-6 py-2 text-lg font-medium leading-normal text-[#f4f4f4] transition duration-150 
                  ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 "
                  type="button"
                  data-ripple-light="true"
                  onClick={handleFavorites}
                >
                  {isFavorite ? (
                    <FontAwesomeIcon icon={filledHeart} />
                  ) : (
                    <FontAwesomeIcon icon={unfilledHeart} />
                  )}
                </button>
              </div>
            </div>
            <p className="text-xl text-gray-300/25 font-bold mb-5 flex">
              {esrb_rating && esrb_rating.name}
            </p>
            {metacritic && (
              <>
                <h2 className="text-xl font-old mt-1 mb-2 text-[#f4f4f4] ">
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
                  <h2 className="text-2xl font-semibold mb-2 text-[#f4f4f4] flex">
                    About
                  </h2>
                  <hr className="mb-5 border-neutral-400 border-1" />
                  <p className="text-lg text-[#9CA3AF]/75 font-thin mb-5">
                    {description_raw}
                  </p>
                </>
              )}
            </section>
            <section className="flex-1">
              <h2 className="text-2xl font-semibold mb-2 text-[#f4f4f4] flex">
                Game Details
              </h2>
              <hr className="mb-5 border-neutral-400 border-1" />
              <ul className="flex flex-col gap-3">
                <li className="flex gap-2 items-center">
                  <h3 className="text-lg  text-[#9CA3AF]">Genres:</h3>
                  <p className="text-md flex flex-row text-[#f4f4f4] font-thin ">
                    {genres &&
                      genres.map((genre, index) => (
                        <div key={genre.id}>
                          {index > 0 && ", "}
                          <Link
                            to={generateGenreLink(genre.name)}
                            className=" hover:underline"
                          >
                            {genre.name}
                          </Link>
                        </div>
                      ))}{" "}
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <h3 className="text-lg  text-[#9CA3AF]">Release Date:</h3>
                  <p className="text-md text-[#f4f4f4] font-thin">{released}</p>
                </li>
                <li className="flex gap-2 items-center">
                  <h3 className="text-lg  text-[#9CA3AF]">Platforms:</h3>
                  <p className="text-md text-[#f4f4f4] font-thin">
                    {platforms.map(({ platform }) => platform.name).join(" | ")}
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <h3 className="text-lg  text-[#9CA3AF]">Developers:</h3>
                  <p className="text-md text-[#f4f4f4] font-thin">
                    {developers.map((dev) => dev.name).join(", ")}
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <h3 className="text-lg  text-[#9CA3AF]">Publisher:</h3>
                  <p className="text-md text-[#f4f4f4] font-thin">
                    {publishers.map((publisher) => publisher.name).join(", ")}
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <h3 className="text-lg  text-[#9CA3AF]">Website:</h3>
                  <a
                    href={`${website}`}
                    rel="noopener noreferrer"
                    className="text-md text-[#f4f4f4] underline"
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
                            <p className="text-md text-[#f4f4f4] font-thin">
                              {platform.requirements.minimum}
                            </p>
                            <p className="text-md text-[#f4f4f4] font-thin">
                              {platform.requirements.recommended}
                            </p>
                          </div>
                        </div>
                      </li>
                    ) : null
                  )}

                <li className="flex gap-2 mb-4 mt-3">
                  <h3 className="text-lg  text-[#9CA3AF]">Tags:</h3>
                  <p className="text-md text-[#f4f4f4] font-thin">
                    {tags.map((tag) => tag.name).join(", ")}
                  </p>
                </li>
              </ul>
            </section>
            <section className="flex-1">
              <h2 className="text-2xl font-semibold mb-2 text-[#f4f4f4] flex">
                Ratings
              </h2>
              <hr className="mb-5 border-neutral-400 border-1" />
              <div className="flex justify-center	">
                {ratings.map((rating) => (
                  <div key={rating.id} className="mb-3 mr-5">
                    <div>
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
                          <p className="font-semibold flex items-center justify-center lg:text-xl text-sm text-[#f4f4f4]">
                            {rating.percent}%
                          </p>
                          <p className="font-bold flex items-center justify-center lg:text-xl text-[10px] text-[#f4f4f4]">
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
