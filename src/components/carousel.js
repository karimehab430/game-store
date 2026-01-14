import React from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { Arrow } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";
import { Link } from "react-router-dom";

const Carousel = ({ carouselData }) => {
  const plugins = [new Arrow()];

  return (
    <div className="relative flex justify-center z-5 pt-20 min-h-[200px] lg:min-h-[600px]">
      <Flicking
        align="center"
        defaultIndex={0}
        circular
        plugins={plugins}
        inputType={["touch", "mouse"]}
        duration={1000}
      >
        {carouselData.map((item) => (
          <div key={item.id} className="mx-2 mb-5 relative">
            <Link to={`/games/${item.id}`}>
              <div className="relative">
                <img
                  className="lg:w-[1024px] lg:h-[600px] w-[360px] h-[200px] object-cover"
                  src={item.background_image}
                  alt={item.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t  from-black/80 via-black/30 to-transparent " />

                <h1
                  style={{ fontFamily: "TiemposHeadlineWeb" }}
                  className="absolute bottom-0 left-0 lg:text-5xl m-5 text-slate-100 drop-shadow-lg z-10"
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
