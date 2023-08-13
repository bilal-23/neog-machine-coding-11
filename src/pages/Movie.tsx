import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMoviesContext } from "../context/movies-context";
import { Button } from "../components/ui/button";

export interface IMovie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  director: string;
  writer: string;
  cast: string[];
  summary: string;
  imageURL: string;
}

const Movie = () => {
  const [movie, setMovie] = useState<IMovie>();
  const { movies, handleStarred, handleWatchList, starred, watchlist } =
    useMoviesContext();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(movie);
  useEffect(() => {
    if (movies) {
      const movie = movies.find((movie) => movie.id === Number(id));
      setMovie(movie);
    } else {
      navigate("/404");
    }
  }, [id, movies]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-8">
      <div className="w-1/2">
        <img src={movie.imageURL} alt={movie.title} />
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        <p className="text-2xl font-bold">{movie.title}</p>
        <p>{movie.summary}</p>
        <p>Year: {movie.year}</p>
        <p>
          Genre:{" "}
          {movie.genre.map((item, index) => {
            return index === movie.genre.length - 1 ? (
              <span key={index}>{item}</span>
            ) : (
              <span key={index}>{item}, </span>
            );
          })}
        </p>
        <p>Year: {movie.year}</p>
        <p>Director: {movie.director}</p>
        <p>Writer: {movie.writer}</p>
        <p>
          Cast:{" "}
          {movie.cast.map((item, index) => {
            return index === movie.cast.length - 1 ? (
              <span key={index}>{item}</span>
            ) : (
              <span key={index}>{item}, </span>
            );
          })}
        </p>
        <div className="align-bottom flex gap-4">
          {starred.find((starredMovie) => starredMovie.id === movie.id) ? (
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
    </div>
  );
};

export default Movie;
