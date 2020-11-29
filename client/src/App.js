import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovieForm from "./Movies/AddMovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const { push } = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [movieList]);

  return (
    <>
      <SavedList list={savedList} />
      
        <button onClick={()=> push("/add-movie")}>
          Add Movie
        </button>
      
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie
          addToSavedList={addToSavedList}
          setMovieList={setMovieList}
          movies={movieList}
        />
      </Route>
      <Route path="/update-movie/:id" render={(props) => <UpdateMovie {...props} movies={movieList} setMovieList={setMovieList} />} />
      <Route path="/add-movie" render={() => <AddMovieForm  movies={movieList} setMovieList={setMovieList} />} />
    </>
  );
};

export default App;
