import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Navbar from "./components/navbar";
import "tailwindcss/tailwind.css";
import GamePage from "./pages/GamePage";
import GenrePage from "./pages/GenrePage";
import FavouritesPage from "./pages/FavouritesPage";
import Footer from "./components/footer";
import Platforms from "./pages/Platforms";
import PlatformPage from "./pages/PlatformPage";

function App() {
  return (
    <div className="bg-[#151515]">
      <BrowserRouter basename={process.env.PUBLIC_URL}> 
        <Navbar />
        <Routes>
          <Route path="/games/:id" element={<GamePage />} />
          <Route path="/favorites" element={<FavouritesPage />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/platforms/:id" element={<PlatformPage />} />
          <Route path="/:gameGenre" element={<GenrePage />} />
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
