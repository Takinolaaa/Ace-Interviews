import Navbar from "../components/Navbar";
import Question from "../components/Question";
import { getQuestions } from "../crud";
import { useEffect, useState, useRef } from "react";

function Home() {
  const [questions, setQuestions] = useState([{}]);
  const [index, setId] = useState(0);
  const [click, setClick] = useState(false);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  console.log(index);
  // pulls questions from the server and puts it in state variable
  useEffect(() => {
    try {
      async function readQuestions() {
        const obtained_questions = await getQuestions();
        setQuestions(obtained_questions);
      }
      readQuestions();
    } catch (error) {
      console.log("Error, could not retreive questions", error);
    }
  }, []);

  //renders change questions when button is clicked
  useEffect(() => {
    if (!click) return;

    let timer = setTimeout(() => {
      setId((prevId) => {
        //try to implement a better way of showing random questions

        if (prevId < questions.length - 1) {
          //   return (prevId = Math.floor(Math.random() * questions.length));

          return prevId + 1;
        }

        return prevId;
      });
    }, 15000);

    return () => clearTimeout(timer);
  }, [index, questions.length, click]);

  const handleStart = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          recorderRef.current = recorder;

          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunksRef.current.push(event.data);
            }
          };

          recorder.start();
          setClick(true);
          console.log("Recording started");
        })
        .catch((err) => {
          console.error(`Error occurred: ${err}`);
        });
    } else {
      console.error("getUserMedia is not supported on this browser.");
    }
  };

  const handleStop = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      recorderRef.current.onstop = async () => {
        // Create a Blob from the chunks (audio/webm format)
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });

        // Create a download link for the webm file
        const url = URL.createObjectURL(blob);

        // Create an anchor element for downloading
        const a = document.createElement("a");
        a.href = url;
        a.download = "recording.webm"; // Use the .webm extension for proper playback
        document.body.appendChild(a);
        a.click(); // Simulate a click to trigger the download

        // Cleanup: revoke the object URL
        URL.revokeObjectURL(url);

        // Optionally remove the anchor element after download
        document.body.removeChild(a);
      };
      setClick(false);
      speechSynthesis.cancel();
    }
  };

  return (
    <>
      <Navbar />

      <div className="align">
        <div className="p-4 flex flex-col">
          {!click ? (
            <p className="bg-gray-200 text-center h-24 p-4 bold border-solid border-2 text-2xl  rounded-md">
              Start your interview practice.
            </p>
          ) : (
            questions[index] && (
              <Question
                id={questions[index].id}
                question={questions[index].question_text}
              />
            )
          )}
        </div>

        <div className="flex justify-center items-center">
          {" "}
          <button
            className="bg-blue-500 w-24 rounded-md bold p-2 mt-3 ml-3 text-white hover:bg-blue-700"
            onClick={handleStart}
          >
            Start
          </button>
          <button
            className="bg-red-500 w-24 rounded-md bold p-2 mt-3 ml-3 text-white hover:bg-red-700"
            onClick={handleStop}
          >
            Stop
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
