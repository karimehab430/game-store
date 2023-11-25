import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Navbar from "./components/navbar";
import "tailwindcss/tailwind.css";
import GamePage from "./pages/GamePage";
import GenrePage from "./pages/GenrePage";
import FavouritesPage from "./pages/FavouritesPage";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:id" element={<GamePage />} />
          <Route path="/:gameGenre" element={<GenrePage />} />
          <Route path="/favorites" element={<FavouritesPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
