import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import "tailwindcss/tailwind.css";
import Footer from "./components/footer";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner.js";
import ScrollToTop from "./components/ScrollToTop";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const Home = lazy(() => import("./pages/home"));
const GamePage = lazy(() => import("./pages/GamePage"));
const GenrePage = lazy(() => import("./pages/GenrePage"));
const FavouritesPage = lazy(() => import("./pages/FavouritesPage"));
const Platforms = lazy(() => import("./pages/Platforms"));
const PlatformPage = lazy(() => import("./pages/PlatformPage"));

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
    <div className="bg-[#151515]">
      
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><LoadingSpinner size="w-12 h-12" /></div>}>
          <Routes>
            <Route path="/games/:id" element={<GamePage />} />
            <Route path="/favorites" element={<FavouritesPage />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/platforms/:id" element={<PlatformPage />} />
            <Route path="/:gameGenre" element={<GenrePage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </div>
    </QueryClientProvider>
  );
}

export default App;
