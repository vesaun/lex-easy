import React from "react";

export default function Transcribing(props) {
    const { downloading } = props;
  return (
    <div className="flex items-center flex-1 flex-col justify-center gap-10 md:gap-14 py-24 p-4 text-center">
      <div className="flex flex-col gap-2 sm:gap-4">
        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
          <span className="text-red-400">Transcribing</span>{" "}
        </h1>
        <p>{!downloading ? 'warming up LexEasy' : 'LexEasy booted up'}</p>
      </div>
      <div className="spinner"></div>
      </div>
  );
}
