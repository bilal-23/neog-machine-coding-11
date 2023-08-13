import { createContext, useContext, useEffect, useState } from "react";
import { moviesData } from "../data";

export interface Movie {
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

interface MoviesContextValue {
  movies: Movie[];
  starred: Movie[];
  watchlist: Movie[];
  filteredMovies: Movie[]; // Movies after applying filters
  handleWatchList: (id: number, action: "add" | "remove") => void;
  handleStarred: (id: number, action: "add" | "remove") => void;
  addMovie: (movie: Movie) => void;

  // Filters
  genres: string[];
  appliedFilters: {
    genres: string;
    releaseYear: string;
    rating: string;
  };

  updateAppliedFilters: (
    filterType: "genre" | "releaseYear" | "rating",
    value: string
  ) => void;

  // Search
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
}

const MoviesContext = createContext<MoviesContextValue>({
  movies: [],
  starred: [],
  watchlist: [],
  filteredMovies: [],
  handleWatchList: () => {},
  handleStarred: () => {},
  addMovie: () => {},

  // Filters
  genres: [],
  appliedFilters: {
    genres: "all",
    releaseYear: "0",
    rating: "0",
  },
  updateAppliedFilters: () => {},

  // Search
  searchQuery: "",
  updateSearchQuery: () => {},
});

interface IMoviesProviderProps {
  children: React.ReactNode;
}
export const MoviesProvider: React.FC<IMoviesProviderProps> = ({
  children,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [starred, setStarred] = useState<Movie[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<
    MoviesContextValue["appliedFilters"]
  >({
    genres: "all",
    releaseYear: "0",
    rating: "0",
  });
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Update the movies and filteres moveies on the initial page load
  useEffect(() => {
    if (!moviesData) return;
    // Get from local storage
    let persistedMovies = localStorage.getItem("movies");
    if (persistedMovies) {
      setMovies(JSON.parse(persistedMovies));
      setFilteredMovies(JSON.parse(persistedMovies));
      const allGenres = [
        ...new Set(
          JSON.parse(persistedMovies).flatMap(
            ({ genre }: { genre: string[] }) => genre
          )
        ),
      ];
      setGenres(allGenres as string[]);
      return;
    } else {
      setMovies(moviesData);
      setFilteredMovies(moviesData);
      // get all the genres-
      const allGenres = [
        ...new Set(
          moviesData.flatMap(({ genre }: { genre: string[] }) => genre)
        ),
      ];
      setGenres(allGenres as string[]);
      localStorage.setItem("movies", JSON.stringify(moviesData));
    }
  }, [moviesData]);

  // Update the filtered movies when the applied filters change
  useEffect(() => {
    if (!movies) return;
    filterMovies();
  }, [appliedFilters, movies]);

  const handleAddMovie = (movie: Movie) => {
    setMovies([...movies, movie]);
    // Update the local storage
    localStorage.setItem("movies", JSON.stringify([...movies, movie]));
  };

  const handleWatchList = (id: number, action: "add" | "remove") => {
    if (action === "add") {
      const movie = movies.find((movie) => movie.id === id);
      if (!movie) return;
      setWatchlist([...watchlist, movie]);
    } else if (action === "remove") {
      const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
      setWatchlist(updatedWatchlist);
    }
  };

  const handleStarred = (id: number, action: "add" | "remove") => {
    if (action === "add") {
      const movie = movies.find((movie) => movie.id === id);
      if (!movie) return;
      setStarred([...starred, movie]);
    } else {
      const updatedStarred = starred.filter((movie) => movie.id !== id);
      setStarred(updatedStarred);
    }
  };

  const updateAppliedFilters = (
    filterType: "genre" | "releaseYear" | "rating",
    value: string
  ) => {
    console.log(filterType, value);
    if (filterType === "genre") {
      setAppliedFilters({
        ...appliedFilters,
        genres: value,
      });
    } else {
      setAppliedFilters({
        ...appliedFilters,
        [filterType]: value,
      });
    }
  };

  const filterMovies = () => {
    let temp = [...movies];

    // Filter by genre
    if (appliedFilters.genres === "all") {
      temp = movies;
    } else {
      const filteredByGenre = temp.filter(({ genre }) =>
        genre.some((g) => appliedFilters.genres.includes(g))
      );
      temp = filteredByGenre;
    }

    // Check if we want to apply the release year filter
    if (appliedFilters.releaseYear === "0") {
      temp = temp;
    } else {
      // Filter by release year
      const filteredByReleaseYear = temp.filter(
        ({ year }) => year === +appliedFilters.releaseYear
      );
      temp = filteredByReleaseYear;
    }

    // Filter by rating
    if (appliedFilters.rating === "0") {
      temp = temp;
    } else {
      const filteredByRating = temp.filter(
        ({ rating }) => rating === +appliedFilters.rating
      );
      temp = filteredByRating;
      console.log(temp);
    }
    setFilteredMovies(temp);
  };

  const value = {
    addMovie: handleAddMovie,
    handleStarred,
    handleWatchList,
    movies,
    starred,
    watchlist,
    filteredMovies,
    genres,
    appliedFilters,
    updateAppliedFilters,
    searchQuery,
    updateSearchQuery: setSearchQuery,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

export const useMoviesContext = () => useContext(MoviesContext);
