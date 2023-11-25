import React, { useState, useEffect } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { Arrow } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "../color.css";
import { Link } from "react-router-dom";
import "../fontStyle.css";

const today = new Date();
const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
const formattedSixMonthsAgo = `${sixMonthsAgo.getFullYear()}-${(
  sixMonthsAgo.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${sixMonthsAgo.getDate().toString().padStart(2, "0")}`;

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const plugins = [new Arrow()];

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=2705c59b51ea4036bf6f6bed038c95ee&dates=${formattedSixMonthsAgo},${formattedToday}&page_size=5&metacritic=80,100&ordering=-metacritic`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCarouselData(data.results);
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });
  }, []);

  return (
    <div className="relative flex justify-center">
      <Flicking
        align="center"
        defaultIndex={0}
        circular={true}
        plugins={plugins}
        inputType={["touch", "mouse"]}
      >
        {carouselData.length > 0 &&
          carouselData.map((item) => (
            <div key={item.id} className="mx-2 mb-5 relative">
              <Link to={`/games/${item.id}`}>
                <div className="relative">
                  <img
                    className="lg:w-[1024px] lg:h-[600px] w-[360px] h-[200px]"
                    src={item.background_image}
                    alt=""
                  />
                  <h1
                    style={{ fontFamily: "TiemposHeadlineWeb" }}
                    className="absolute bottom-0 left-0 lg:text-5xl m-5 text-slate-100"
                  >
                    {item.name.length > 41 ? item.name.slice(0, 41) : item.name}
                  </h1>
                </div>
              </Link>
            </div>
          ))}
        <ViewportSlot>
          <div>
            <span className="flicking-arrow-prev is-thin"></span>
            <span className="flicking-arrow-next is-thin"></span>
          </div>
        </ViewportSlot>
      </Flicking>
    </div>
  );
};

export default Carousel;
