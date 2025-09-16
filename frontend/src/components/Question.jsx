import { useEffect } from "react";

export default function Question({ id, question }) {
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(question);
    const voices = window.speechSynthesis.getVoices();
    speechSynthesis.cancel();
    const britishVoice = voices.find(
      (voice) =>
        voice.lang === "en-GB" && voice.name.toLowerCase().includes("female")
    );

    if (britishVoice) {
      utterance.voice = britishVoice;
    }
    if (question) {
      // Optionally adjust speech properties
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    }
  }, [question]); // Runs only when 'question' changes

  return (
    <>
      <div
        id={id}
        className="bg-gray-200 bold h-24 p-4 border-solid border-2 rounded-md
      "
      >
        <p className="">{question}</p>
      </div>
    </>
  );
}
