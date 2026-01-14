import React from "react";
import { GiFlame } from "react-icons/gi";

export const Section = ({ title, children }) => (
  <div className="px-2 mb-4 mx-4 py-10">
    <div className="flex items-center mb-5">
      <h1 className="text-4xl font-semibold text-[#f4f4f4] flex pb-2 mr-3">
        {title}
      </h1>
      {title === "Hot Games" && <GiFlame size={36} color="orange" />}
    </div>
    <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-sm mx-auto md:max-w-none md:mx-0">
      {children}
    </div>
  </div>
);
