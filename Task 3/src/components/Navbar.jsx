import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 p-4 flex justify-between text-white">
      <h1 className="text-xl font-bold">📝 Notes App</h1>
      <Link
        to="/add"
        className="bg-white text-green-600 px-4 py-2 rounded hover:bg-green-100 transition"
      >
        Add Note
      </Link>
    </nav>
  );
};

export default Navbar;
