export default function AudioRec({ id, audio_data }) {
  return (
    <>
      <div id={id} className="bg-gray-200 bold ">
        <audio controls src={audio_data}></audio>
        <a href={audio_data}> Download audio </a>
      </div>
    </>
  );
}
