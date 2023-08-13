import MoviesList from "../components/MoviesList";
import MoviesHeader from "../components/movies-header";
import { useMoviesContext } from "../context/movies-context";

const Home = () => {
  const { filteredMovies, searchQuery } = useMoviesContext();
  return (
    <>
      <div className="flex flex-col gap-8">
        <MoviesHeader />
        <MoviesList
          movies={filteredMovies.filter((item) => {
            if (searchQuery === "") {
              return item;
            }
            if (item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
              return item;
            }
            if (
              item.director.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              return item;
            }
            if (
              item.cast.join().toLowerCase().includes(searchQuery.toLowerCase())
            ) {
              return item;
            }
            return false;
          })}
        />
      </div>
    </>
  );
};

export default Home;
