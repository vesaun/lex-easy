import React from "react";
import { LANGUAGES } from "../utils/presets";

export default function Translation(props) {
  const {
    textElement,
    toLanguage,
    translating,
    setToLanguage,
    generateTranslation
  } = props;
  return (
    <div className="flex flex-col gap-2 max-w-[400px] w-full mx-auto">
      {!translating && (<div className="flex flex-col gap-1">
      <p className="text-xs sm:text-sm font-medium text-slate-500 mr-auto">Select language</p>
      <div className="flex items-stretch gap-2">
        <select
          value={toLanguage}
          className="flex-1 outline-none bg-white focus:outline-none border border-solid border-transparent 
          hover:border-red-300 duration-200 p-2 rounded"
          onChange={(e) => setToLanguage(e.target.value)}
        >
          <option value="Select language">Select language</option>
          {Object.entries(LANGUAGES).map(([key, value]) => {
            return (
              <option key={key} value={value}>
                {key}
              </option>
            );
          })}
        </select>
        <button onClick={generateTranslation} className="specialBtn px-4 py-2 rounded-lg text-red-400 hover:text-red-600 duration-200">Translate</button>
      </div>
      </div>)}

      {(textElement && !translating) && (
        <p>{textElement}</p>
      )}

      {translating && (
        <div className="grid place-items-center">
          <i className="fa-solid fa-circle-notch animate-spin"></i>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-4 mx-auto">this may take a minute...</p>
        </div>
      )}
    </div>
  );
}
