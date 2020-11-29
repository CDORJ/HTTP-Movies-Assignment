import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
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
    e.persist();
    let value =
      e.target.name === "metascore" ? Number(e.target.value) : e.target.value;
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

  return (
    <div className="movie-card">
      <h2>Update Movie Details</h2>
      <form>
        <label htmlFor="title" />
        Title<br/>
        <input
          id="title"
          name="title"
          placeHolder="title"
          value={item.title}
          type="text"
          onChange={handleChange}
        /><br/><br/>
        <label htmlFor="director" />
        Director<br/>
        <input
          id="director"
          name="director"
          placeHolder="director"
          value={item.director}
          type="text"
          onChange={handleChange}
        /><br/><br/>
        <label htmlFor="metascore" />
        Metascore<br/>
        <input
          id="metascore"
          name="metascore"
          placeHolder="metascore"
          value={item.metascore}
          type="text"
          onChange={handleChange}
        /><br/>
        <button className='save-button'>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
