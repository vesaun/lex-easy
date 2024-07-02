import React, { useState, useEffect, useRef } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

export default function Information(props) {
  const { output } = props;
  const [tab, setTab] = useState("transcription");
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(null);
  const [toLanguage, setToLanguage] = useState("Select language");

  const worker = useRef();

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../utils/translate.worker.js", import.meta.url),
        { type: "module" }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.status) {
        case "initiate":
          console.log("initiate");
          break;
        case "progress":
          console.log("progress");
          break;
        case "update":
          setTranslation(e.data.output);
          console.log(e.data.output);
          break;
        case "complete":
          setTranslating(false);
          console.log("complete");
          break;
        default:
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  function handleCopy() {
    navigator.clipboard.writeText(textElement);
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Freescribe_${new Date().toString()}.txt`;
    document.body.appendChild(element);
    element.click();
  }

  function generateTranslation() {
    if (translating || toLanguage === "Select language") {
      return;
    }

    setTranslating(true);

    worker.current.postMessage({
      text: output.map((val) => val.text),
      src_lang: "eng_Latn",
      tgt_lang: toLanguage,
    });
  }

  const textElement =
    tab === "transcription"
      ? output.map((val) => val.text)
      : translation || "No translation";

  return (
    <main
      className="flex-1 p-4 gap-3 text-center sm:gap-4
    flex flex-col justify-center pb-20 max-w-prose w-full mx-auto"
    >
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
        Your <span className="text-red-400">Transcription</span>{" "}
      </h1>
      <div className="grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center">
        <button
          onClick={() => setTab("transcription")}
          className={
            "px-4 duration-200 py-1 font-medium text-red-400" +
            (tab === "transcription"
              ? " bg-red-300 text-white "
              : " text-red-400 hover:text-red-600")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => setTab("translation")}
          className={
            "px-4 duration-200 py-1 font-medium text-red-400" +
            (tab === "translation"
              ? " bg-red-300 text-white "
              : " text-red-400 hover:text-red-600")
          }
        >
          Translation
        </button>
      </div>
      <div className="my-8 flex flex-col">
        {tab === "transcription" ? (
          <Transcription {...props} textElement={textElement} />
        ) : (
          <Translation
            {...props}
            translating={translating}
            textElement={textElement}
            toLanguage={toLanguage}
            setTranslating={setTranslating}
            setTranslation={setTranslation}
            setToLanguage={setToLanguage}
            generateTranslation={generateTranslation}
          />
        )}
      </div>

      <div className="flex items-center gap-4 mx-auto">
        <button
          title="Copy"
          onClick={handleCopy}
          className="specialBtn text-red-300 hover:text-red-500 duration-200 px-2 aspect-square grid place-items-center rounded px-4"
        >
          <i className="fa-solid fa-copy"></i>
        </button>
        <button
          title="Download"
          onClick={handleDownload}
          className="specialBtn text-red-300 hover:text-red-500 duration-200 px-2 aspect-square grid place-items-center rounded px-4"
        >
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </main>
  );
}
