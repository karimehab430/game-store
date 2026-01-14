import React from "react";

export const Info = ({ title, children }) => (
  <div className="bg-neutral-800 p-4 rounded-lg">
    <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
    <div>{children}</div>
  </div>
);
