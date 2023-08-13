import { cn } from "../lib/utils";
import { NavLink } from "react-router-dom";
import { Input } from "./ui/input";
import { useMoviesContext } from "../context/movies-context";

const Navigation = () => {
  const { searchQuery, updateSearchQuery } = useMoviesContext();

  return (
    <div
      className={cn("min-w-1/5 flex justify-between bg-slate-700 px-10 py-4 ")}
    >
      <h1 className="text-3xl font-bold">IMDB</h1>
      <div>
        <Input
          value={searchQuery}
          onChange={(e) => updateSearchQuery(e.target.value)}
          type="search"
          className="flex-1 w-auto sm:w-[200px] md:w-[300px] "
          placeholder="Search a movie by its title, cast or director."
        />
      </div>
      <ul className={cn("flex gap-4 text-2xl")}>
        <li className="hover:text-white text-slate-400">
          <NavLink
            to={"/"}
            className={({ isActive }) => (!isActive ? "" : "text-white")}
          >
            Movies
          </NavLink>
        </li>
        <li className="hover:text-white text-slate-400">
          <NavLink
            to={"/watchlist"}
            className={({ isActive }) => (!isActive ? "" : "text-white")}
          >
            Watchlist
          </NavLink>
        </li>
        <li className="hover:text-white text-slate-400">
          <NavLink
            to={"/starred"}
            className={({ isActive }) => (!isActive ? "" : "text-white")}
          >
            Starred Movies
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
