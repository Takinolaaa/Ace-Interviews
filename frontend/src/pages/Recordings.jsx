import Navbar from "../components/Navbar";
import AudioRec from "../components/Audio";
import { useEffect, useState } from "react";
import { getAudio } from "../crud";
export default function Recordings() {
  const [recordings, setRecordings] = useState([{}]);

  useEffect(() => {
    try {
      async function ShowRecrdings() {
        const audio_recordings = await getAudio();
        setRecordings(audio_recordings);
      }
      ShowRecrdings();
    } catch (error) {
      console.log("Error, could not retreive questions", error);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="bg-gray-200 h-96 rounded-xl   gap-2 w-full p-4 flex">
          <AudioRec id={recordings.id} audio_data={recordings.audio_data} />
        </div>
      </div>
    </>
  );
}
