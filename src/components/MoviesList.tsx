import { Link } from "react-router-dom";
import { Movie, useMoviesContext } from "../context/movies-context";
import { Button } from "./ui/button";

interface Props {
  movies: Movie[];
}
const MoviesList: React.FC<Props> = ({ movies }) => {
  const { handleStarred, handleWatchList, starred, watchlist } =
    useMoviesContext();

  return (
    <>
      <div className="flex flex-wrap gap-12 px-2 py-2 justify-center">
        {movies.map((movie) => {
          return (
            <div
              className="flex flex-col w-1/4 gap-2 bg-slate-600"
              key={movie.id}
            >
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <img
                  src={movie.imageURL}
                  alt={movie.title}
                  className="w-full h-auto object-cover"
                />
                <div className="text-xl text-center mb-4">
                  <p>{movie.title}</p>
                  <p>{movie.summary}</p>
                </div>
              </Link>
              <div className="flex justify-between items-end gap-4">
                {starred.find(
                  (starredMovie) => starredMovie.id === movie.id
                ) ? (
                  <Button
                    className="w-full"
                    onClick={() => handleStarred(movie.id, "remove")}
                  >
                    Remove from Starred
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleStarred(movie.id, "add")}
                  >
                    Star
                  </Button>
                )}
                {watchlist.find(
                  (watchlistMovie) => watchlistMovie.id === movie.id
                ) ? (
                  <Button
                    className="w-full"
                    onClick={() => handleWatchList(movie.id, "remove")}
                  >
                    Remove from Watchlist
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleWatchList(movie.id, "add")}
                  >
                    Add to Wathclist
                  </Button>
                )}
              </div>
            </div>
          );
        })}
        {movies.length === 0 && (
          <h1 className="text-4xl font-bold">No Movies Found</h1>
        )}
      </div>
    </>
  );
};

export default MoviesList;
