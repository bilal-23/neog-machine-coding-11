import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Watchlist from "./pages/Watchlist";
import Starred from "./pages/Starred";
import AddMovie from "./pages/add-movie";

function App() {
  return (
    <>
      <main className="flex flex-col bg-slate-800 min-h-screen">
        <Navigation />
        <section className="py-10 px-12 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies/:id" element={<Movie />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/starred" element={<Starred />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="*" element={<div>404: Not Found</div>} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
