import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 p-4">
     <a href="/"><h1 className="font-bold">
        Lex<span className="text-red-400 bold">Easy</span>{" "}
      </h1></a> 
      <a href="/" className="flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-sm text-red-400">
        <p>New</p>
        <i className="fa-solid fa-plus"></i>
      </a>
    </header>
  );
}
