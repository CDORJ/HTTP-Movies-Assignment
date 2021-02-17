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
  }, [id, props.movieList]);

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
        props.setMovieList(
          props.movieList.map((mv) => {
            if (mv.id === Number(id)) return res.data;
            return mv;
          })
        )
        setMovie(initialMovie)
        push(`/movies/${id}`);
      })
      .catch((err) => console.log(`unable to update movie id # ${id}: `, err));
  };

  return (
    <div className="movie-card">
      <h2>Update, Save, or Delete This Movie:</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title" />
        Title
        <br />
        <input
          id="title"
          name="title"
          placeholder="Title"
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
          placeholder="Director"
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
          placeholder="Metascore"
          type="text"
          value={movie.metascore}
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
          value={movie.stars.join(",")}
          onChange={handleChange}
        />
        <br />
        <button type="onSubmit" className="save-button">
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
