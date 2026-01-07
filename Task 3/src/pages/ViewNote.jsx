import { useParams, useNavigate } from "react-router-dom";

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const note = notes[id];

  const deleteNote = () => {
    notes.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    navigate("/");
  };

  if (!note) return <p className="p-6">Note not found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-green-600">
          {note.title}
        </h1>
        <p className="mt-4 text-gray-700">{note.content}</p>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-green-600 hover:underline"
          >
            ← Back
          </button>
          <button
            onClick={deleteNote}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
