import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const newMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddMovieForm = (props) => {
  const [movie, setMovie] = useState(newMovie);
  const { push } = useHistory();

  const handleChange = (e) => {
    let value =
      e.target.name === "stars" ? e.target.value.split(",") : e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/api/movies", movie)
      .then((res) => {
        props.setMovieList(res.data);
        setMovie(newMovie);
        push("/");
      })
      .catch((err) => console.log(`unable to add movie: `, err));
  };

  return (
    <div className="movie-card">
      <h2>Add New Movie</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title" />
        Title
        <br />
        <input
          id="title"
          name="title"
          placeHolder="title"
          type="text"
          value={movie.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="director" />
        Director
        <br />
        <input
          id="director"
          name="director"
          placeHolder="director"
          value={movie.director}
          type="text"
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="metascore" />
        Metascore
        <br />
        <input
          id="metascore"
          name="metascore"
          placeHolder="metascore"
          value={movie.metascore}
          type="number"
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="stars" />
        Stars
        <br />
        <input
          id="stars"
          name="stars"
          placeHolder="Stars (separate by comma)"
          value={movie.stars.join(",")}
          type="text"
          onChange={handleChange}
        />
        <br />
        <button className="save-button">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
