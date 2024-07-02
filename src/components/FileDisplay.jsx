import React from "react";

export default function FileDisplay(props) {
  const { handleAudioReset, file, audioStream, handleFormSubmission } = props;

  return (
    <main
      className="flex-1 p-4 gap-3 text-center sm:gap-4
    flex flex-col justify-center pb-20 sm:w-96 w-72 max-w-full mx-auto"
    >
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your <span className="text-blue-400">Audio</span>{" "}
      </h1>
      <div className="flex flex-col text-left my-4">
        <h3 className="font-semibold">Name</h3>
        <p>{file ? file.name : 'Custom recorded audio'}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button onClick={handleFormSubmission} className="specialBtn px-4 py-2 rounded-lg text-blue-400 flex items-center gap-1 font-medium">
          Transcribe
          <i className="fa-solid fa-marker"></i>
        </button>
        <button onClick={handleAudioReset} className="text-slate-400 hover:text-blue-600 duration-200">Reset</button>
      </div>
    </main>
  );
}
