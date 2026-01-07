import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const saveNote = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title, content });
    localStorage.setItem("notes", JSON.stringify(notes));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Add New Note
        </h2>

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded mb-4"
          placeholder="Content"
          rows="5"
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={saveNote}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default AddNote;
