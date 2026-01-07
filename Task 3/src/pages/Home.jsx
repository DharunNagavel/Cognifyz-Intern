import { Link } from "react-router-dom";

const Home = () => {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.length === 0 && (
        <p className="text-gray-600">No notes available</p>
      )}

      {notes.map((note, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold">{note.title}</h2>
          <p className="text-gray-600 mt-2">
            {note.content.substring(0, 60)}...
          </p>
          <Link
            to={`/view/${index}`}
            className="text-green-600 mt-3 inline-block hover:underline"
          >
            View →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
