import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useMoviesContext } from "../context/movies-context";

// to 2023
const releaseYears = [
  1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002,
  2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
  2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
];

const MoviesHeader = () => {
  const { genres, updateAppliedFilters, appliedFilters } = useMoviesContext();

  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">Movies</h1>
      <Select
        onValueChange={(e) => updateAppliedFilters("genres", e)}
        value={appliedFilters.genres}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="disabled" disabled>
            Department
          </SelectItem>
          <SelectItem value={"all"}>All genres</SelectItem>
          {genres.map((genre) => {
            return (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(e) => {
          updateAppliedFilters("releaseYear", e);
        }}
        value={appliedFilters.releaseYear + ""}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={"Sort By"} />
        </SelectTrigger>
        <SelectContent className="h-[400px] overflow-y-scroll">
          <SelectItem value="disabled" disabled>
            Sort By Release year
          </SelectItem>
          <SelectItem value={0 + ""}>All Years</SelectItem>
          {releaseYears.map((item) => {
            return <SelectItem value={item + ""}>{item}</SelectItem>;
          })}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(e) => {
          updateAppliedFilters("rating", e);
        }}
        value={appliedFilters.rating + ""}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={"Sort By"} />
        </SelectTrigger>
        <SelectContent className="h-[400px] overflow-y-scroll">
          <SelectItem value="disabled" disabled>
            Sort By Release year
          </SelectItem>
          <SelectItem value={0 + ""}>All Ratings</SelectItem>
          {Array(10)
            .fill(0)
            .map((_item, index) => {
              return (
                <SelectItem value={index + 1 + ""}>{index + 1}</SelectItem>
              );
            })}
        </SelectContent>
      </Select>
      <Link to="/add-movie">
        <Button variant="outline">New</Button>
      </Link>
    </div>
  );
};

export default MoviesHeader;
