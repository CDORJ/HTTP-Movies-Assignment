import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axiosWithAuth from "../utilities/axiosWithAuth";

const initialMovie = {
  id: null,
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get(`/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(`unable to getMovieById # ${id}: `, err));
  }, []);

  const handleChange = (e) => {
    let value =
      e.target.name === "stars" ? e.target.value.split(",") : e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/movies/${id}`, movie)
        .then((res) => {
          setMovie(res.data)
      })
      .catch((err) => console.log(`unable to update movie id # ${id}: `, err));
  };

  return (
    <div>
      <h2>Update, Save, or Delete This Movie:</h2>
      <form>
        <label htmlFor="title" />
        Title
        <br />
        <input
          id="title"
          name="title"
          placeHolder="Title"
          type="text"
          value={movie.title}
          onChange={handleChange}
        />
        <label htmlFor="director" />
        Director
        <br />
        <input
          id="director"
          name="director"
          placeHolder="Director"
          type="text"
          value={movie.director}
          onChange={handleChange}
        />
        <label htmlFor="metascore" />
        Metascore
        <br />
        <input
          id="metascore"
          name="metascore"
          placeHolder="Metascore"
          type="text"
          value={movie.metascore}
          onChange={handleChange}
        />
        <label htmlFor="stars" />
        Stars
        <br />
        <input
          id="stars"
          name="stars"
          placeHolder="Stars"
          type="text"
          value={movie.stars.join(",")}
          onChange={handleChange}
        />
        <button type="onSubmit" className="save-button">
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
