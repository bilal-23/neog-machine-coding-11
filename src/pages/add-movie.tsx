import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useMoviesContext } from "../context/movies-context";
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  summary: "",
  year: "",
  cast: "",
  genre: "",
  rating: "",
  director: "",
  writer: "",
  imageURL: "",
};

const AddMovie = () => {
  const { addMovie } = useMoviesContext();
  const [formData, setFormData] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const temp = { ...formData, [e.target.id]: e.target.value };
    // Check if all fields are filled
    if (Object.values(temp).every((value) => value !== null)) {
      setButtonDisabled(false);
    }
    setFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cast = formData.cast.split(",").map((item) => item.trim());
    const genre = formData.genre.split(",").map((item) => item.trim());
    addMovie({
      ...formData,
      cast,
      genre,
      rating: +formData.rating,
      year: +formData,
      id: Math.floor(Math.random() * 1000),
    });
    navigate("/");
  };
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-center">Add New Product</h1>
      <form
        className="flex flex-col gap-2 border-slate-900 w-auto lg:w-1/2 m-auto"
        onSubmit={handleFormSubmit}
      >
        <div>
          <Label htmlFor="title">Title:</Label>
          <Input id="title" required onChange={handleChangeInput} />
        </div>
        <div className="textarea">
          <Label htmlFor="summary">Summary:</Label>
          <Textarea
            id="summary"
            className="overflow-hidden textarea"
            required
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label htmlFor="year">Year:</Label>
          <Input
            id="year"
            placeholder="1990"
            type="number"
            min={1990}
            max={2023}
            required
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label htmlFor="cast">Cast: (Enter comma separated values)</Label>
          <Input id="cast" min={0} type="text" onChange={handleChangeInput} />
        </div>
        <div>
          <Label htmlFor="genre">Genre: (Enter comma separated values)</Label>
          <Input id="genre" type="text" required onChange={handleChangeInput} />
        </div>
        <div>
          <Label htmlFor="rating">Rating:</Label>
          <Input
            id="rating"
            type="number"
            required
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label htmlFor="director">Director:</Label>
          <Input
            id="director"
            type="text"
            required
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label htmlFor="writer">Writer:</Label>
          <Input
            id="writer"
            type="text"
            required
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label htmlFor="imageUrl">Image Url:</Label>
          <Input
            id="imageUrl"
            type="text"
            required
            onChange={handleChangeInput}
          />
        </div>
        <div className="mt-2">
          <Button className="w-full" disabled={buttonDisabled}>
            Add Movie
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
