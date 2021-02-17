import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utilities/axiosWithAuth";

const initialMovie = {
  id: null,
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddMovie = ({ movieList, setMovieList }) => {
  const [newMovie, setNewMovie] = useState(initialMovie);
  const { push } = useHistory();

  const handleChange = (e) => {
    let value =
      e.target.name === "stars" ? e.target.value.split(",") : e.target.value;
    setNewMovie({ ...newMovie, [e.target.name]: value });
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post(`/movies`, newMovie)
            .then((res) => {
                setMovieList(res.data);
                setNewMovie(initialMovie);
                push('/')
            })
            .catch((err) => console.log("err adding new movie: ", err))
    }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="title" />
        Title
        <br />
        <input
          id="title"
          name="title"
          placeholder="Title"
          type="text"
          value={newMovie.title}
          onChange={handleChange}
        />
        <label htmlFor="director" />
        Director
        <br />
        <input
          id="director"
          name="director"
          placeholder="Director"
          type="text"
          value={newMovie.director}
          onChange={handleChange}
        />
        <label htmlFor="metascore" />
        Metascore
        <br />
        <input
          id="metascore"
          name="metascore"
          placeholder="Metascore"
          type="text"
          value={newMovie.metascore}
          onChange={handleChange}
        />
        <label htmlFor="stars" />
        Stars
        <br />
        <textarea
          id="stars"
          name="stars"
          placeholder="Stars"
          type="text"
          value={newMovie.stars.join(",")}
          onChange={handleChange}
        />
        <br />
        <button type="onSubmit" >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
