import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Arrow } from "@egjs/flicking-plugins";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../redux/favoriteSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { AiOutlineClose } from "react-icons/ai";
import LoadingSpinner from "../components/LoadingSpinner";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import "react-circular-progressbar/dist/styles.css";
import { Info } from "./Info";

const API_KEY = process.env.REACT_APP_API_KEY;

const fetchGame = async (id) => {
  const endpoints = [
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
    `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`,
  ];
  const [game, screenshots] = await Promise.all(
    endpoints.map((url) =>
      fetch(url).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
    )
  );
  return { game, screenshots: screenshots.results || [] };
};


const PathColor = (title) =>
  ({
    exceptional: "#66FF00",
    recommended: "#5375da",
    meh: "#FFFF33",
    skip: "red",
  }[title] || "#444");

export default function GamePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((s) => s.favorites.value);
  const [modal, setModal] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["game", id],
    queryFn: () => fetchGame(id),
  });

  useEffect(() => {
    document.documentElement.style.overflow = modal ? "hidden" : "auto";
  }, [modal]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#202020]">
        <LoadingSpinner size="w-16 h-16" />
        <p className="text-gray-400">Loading game details…</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#202020]">
        <p>Error loading game data.</p>
      </div>
    );
  }

  const { game, screenshots } = data;

  const isFavorite = game && favorites.some((g) => g.id === game.id);
  const plugins = [new Arrow({ prevElSelector: ".flicking-arrow-prev" })];

  const {
    name,
    description_raw,
    genres,
    metacritic,
    released,
    platforms,
    developers,
    publishers,
    website,
    esrb_rating,
    tags,
    ratings,
  } = game;

  return (
    <div className="bg-[#202020] text-[#f4f4f4]">
      <section className="relative pt-24 pb-10">
        <Flicking circular align="center" plugins={plugins}>
          {screenshots.map((s) => (
            <img
              key={s.id}
              src={s.image}
              alt={name}
              onClick={() => setModal(s)}
              className="lg:w-[1024px] lg:h-[576px] w-[360px] h-[200px] cursor-pointer mx-2 rounded-lg"
            />
          ))}
          <ViewportSlot>
            <span className="flicking-arrow-prev is-thin" />
            <span className="flicking-arrow-next is-thin" />
          </ViewportSlot>
        </Flicking>

        <div className="max-w-6xl mx-auto mt-8 px-5">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              {name}
            </h1>
            <button
              aria-label="Toggle Favorite"
              onClick={() => dispatch(isFavorite ? remove(game) : add(game))}
              className={`p-3 rounded-full transition hover:scale-110 ${
                isFavorite ? "bg-red-600" : "bg-neutral-700"
              }`}
            >
              <FontAwesomeIcon
                icon={isFavorite ? filledHeart : unfilledHeart}
              />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 items-center mt-4">
            {metacritic && (
              <span className="bg-[#00ce7a] text-black px-3 py-1 rounded-md font-bold">
                {metacritic}
              </span>
            )}
            <span className="text-gray-400">{released}</span>
            {esrb_rating && (
              <span className="text-gray-400">{esrb_rating.name}</span>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 grid gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-3">About</h2>
          <p className="text-lg leading-relaxed text-gray-300">
            {description_raw}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info title="Genres">
            {genres?.map((g) => (
              <Link key={g.id} to={`/${g.slug}`} className="underline mr-2">
                {g.name}
              </Link>
            ))}
          </Info>
          <Info title="Platforms">
            {platforms?.map((p) => p.platform.name).join(" | ")}
          </Info>
          <Info title="Developers">
            {developers?.map((d) => d.name).join(", ")}
          </Info>
          <Info title="Publishers">
            {publishers?.map((p) => p.name).join(", ")}
          </Info>
          <Info title="Website">
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Official Website
            </a>
          </Info>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags?.map((t) => (
            <span
              key={t.id}
              className="bg-neutral-700 px-3 py-1 rounded-full text-sm"
            >
              {t.name}
            </span>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Ratings</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {ratings?.map((r) => (
              <CircularProgressbarWithChildren
                key={r.id}
                value={r.percent}
                styles={buildStyles({ pathColor: PathColor(r.title) })}
              >
                <p className="text-2xl font-bold">{r.percent}%</p>
                <p className="text-xs uppercase tracking-wide opacity-70">
                  {r.title}
                </p>
              </CircularProgressbarWithChildren>
            ))}
          </div>
        </div>
      </section>

      {modal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <button
            onClick={() => setModal(null)}
            className="absolute top-5 right-5"
          >
            <AiOutlineClose size={28} />
          </button>
          <img
            src={modal.image}
            alt="screenshot"
            className="max-h-[90vh] rounded-xl"
          />
        </div>
      )}
    </div>
  );
}
