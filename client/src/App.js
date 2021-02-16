import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axiosWithAuth from "./utilities/axiosWithAuth";
import UpdateMovie from "./Movies/UpdateMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const { push } = useHistory();
  const { id } = useParams();

  const getMovieList = () => {
    axiosWithAuth()
      .get("/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Switch>
        <Route path="/" render={() => <MovieList movies={movieList} />} />

        <Route
          path="/movies/:id"
          render={() => <Movie addToSavedList={addToSavedList} movieList={movieList} setMovieList={setMovieList}/>}
        />

        <Route path='/update-movie/:id' render={(props) => <UpdateMovie {...props} movies={movieList} setMovieList={setMovieList} />} />
        
      </Switch>
    </>
  );
};

export default App;
