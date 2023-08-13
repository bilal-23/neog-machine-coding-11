import MoviesList from "../components/MoviesList";
import { useMoviesContext } from "../context/movies-context";

const Watchlist = () => {
  const { watchlist } = useMoviesContext();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Watchlist</h1>
      <MoviesList movies={watchlist} />
    </div>
  );
};

export default Watchlist;
