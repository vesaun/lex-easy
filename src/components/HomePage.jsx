import React, {useState, useEffect, useRef} from "react";

export default function HomePage(props) {
    const {setFile, setAudioStream }= props

    const [recordingStatus, setRecordingStatus] = useState('inactive');
    const [audioChunks, setAudioChunks] = useState([]);
    const [duration, setDuration] = useState(0);

    const mediaRecorder = useRef(null);

    const mimeType = 'audio/webm'

    async function startRecording() {
        let tempStream

        console.log('start recording')

        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })

            tempStream = streamData
        } catch(err) {
            console.log(err.message)
            return
        }

        setRecordingStatus('recording');

        const media = new MediaRecorder(tempStream, { type: mimeType })
        mediaRecorder.current = media

        mediaRecorder.current.start()
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') {return}
            if (event.data.size === 0) {return}
            localAudioChunks.push(event.data)
        }
        setAudioChunks(localAudioChunks);
    }
    
    async function stopRecording() {
        setRecordingStatus('inactive');
        console.log('stop recording')

        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, {type: mimeType})
            setAudioStream(audioBlob)
            setAudioChunks([])
            setDuration(0)
        }
    }

    useEffect(() => {
        if (recordingStatus === 'inactive') {return}
        const interval = setInterval(() => {
            setDuration((prevDuration) => prevDuration + 1)
        }, 1000)

        return () => clearInterval(interval)

    })


  return (
    <main
      className="flex-1 p-4 gap-3 text-center sm:gap-4 md:gap-5
    flex flex-col justify-center pb-20"
    >
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Lex<span className="text-red-400">Easy</span>{" "}
      </h1>
      <h3 className="font-medium md:text-lg">
        Record<span className="text-red-400">&rarr;</span>
        Transcribe<span className="text-red-400">&rarr;</span>Translate
      </h3>
      <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className="flex specialBtn px-4 py-2 rounded-xl text-red-400 items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4">
        <p>{recordingStatus === 'inactive' ? 'Record' : 'Stop Recording'}</p>
        <div className="flex items-center gap-2">

            {duration && (
                <p className="text-sm">{duration}s</p>
            )}
            <i className={"fa-solid fa-microphone duration-200" + (recordingStatus === 'recording' ? 'text-rose-300' : "")}></i>
        </div>
      </button>
      <p className="text-base">
        Or{" "}
        <label className="text-red-400 cursor-pointer hover:text-red-600 hover:font-bold duration-200">
          UPLOAD{" "}
          <input onChange={(e) => {
            const tempFile = e.target.files[0]
            setFile(tempFile)
          }} className="hidden" type="file" accept=".mp3, .wave"></input>
        </label> a .mp3 file.
      </p>
      <p className="italic text-slate-400 pt-8">bridge the world with every word</p>
    </main>
  );
}
