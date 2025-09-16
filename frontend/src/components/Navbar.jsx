export default function Navbar() {
  return (
    <nav className="flex bg-blue-500 text-black p-4 justify-between">
      {" "}
      <a href="/">Ace-Interviews</a>{" "}
      <div className="flex gap-2">
        {/* <a href="/">Home</a>{" "} */}
        {/* <a className="" href="/recordings">
          Recordings
        </a> */}
      </div>
    </nav>
  );
}
