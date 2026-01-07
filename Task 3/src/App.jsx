import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import ViewNote from "./pages/ViewNote";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddNote />} />
        <Route path="/view/:id" element={<ViewNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
