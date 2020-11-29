import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: null,
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = (props) => {
  const [item, setItem] = useState(initialMovie);
  const { id } = useParams();
  const { push } = useHistory();

  const handleChange = (e) => {
    let value =
      e.target.name === "stars" ? e.target.value.split(",") : e.target.value;
    setItem({ ...item, [e.target.name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("cd: UpdateMovie.js: UpdateMovie: axios.get res: ", res);
        setItem(res.data);
      })
      .catch((err) => console.log(`unable to getMovieById # ${id}: `, err));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then((res) => {
        console.log(`cd: UpdateMovie.js: onSubmit: axios.put res: `, res);
        setItem(res.data);
        push("/");
      })
      .catch((err) => console.log(`unable to update movie id # ${id}: `, err));
  };

  return (
    <div className="movie-card">
      <h2>Update Movie Details</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title" />
        Title
        <br />
        <input
          id="title"
          name="title"
          placeHolder="title"
          type="text"
          value={item.title}
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
          value={item.director}
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
          value={item.metascore}
          type="number"
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="stars" />
        Stars
        <br />
        <textarea
          id="stars"
          name="stars"
          placeHolder="stars"
          value={item.stars.join(",")}
          type="text"
          onChange={handleChange}
        />
        <br />
        <button className="save-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
