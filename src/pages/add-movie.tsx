import React from "react";

const addMovie = () => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return <form onSubmit={handleFormSubmit}></form>;
};

export default addMovie;
