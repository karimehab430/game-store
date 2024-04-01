import React from "react";

const Footer = () => {
  return (
    <div className="bg-zinc-950 text-[#f4f4f4] rounded">
      <p className="text-center p-4">
        Developed by
        <a
          href="https://github.com/karimehab430"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 font-medium mx-1"
        >
          Karim Ehab.
        </a>
        Copyright &copy; Game-Store App 2024. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
