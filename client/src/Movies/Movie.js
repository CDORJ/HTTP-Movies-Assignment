import React, { useEffect, useState } from "react";
import axiosWithAuth from '../utilities/axiosWithAuth'
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axiosWithAuth()
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleDelete = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`/movies/${id}`)
      .then((res) => {
        console.log('cd: Movie.js: handleDelete: axios.delete res: ', res)
      })
      .catch((err) => console.log(`unable to delete movie id # ${id}`, err));
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} setMovie={setMovie}/>
      <button className="save-button" onClick={saveMovie}>
        Save
      </button>
      <button className="update-button" onClick={() => push(`/update-movie/${id}`)}>
        Edit Movie
      </button>
      <button className="delete-button" onClick={handleDelete}>
        Delete Movie
      </button>
    </div>
  );
}

export default Movie;
