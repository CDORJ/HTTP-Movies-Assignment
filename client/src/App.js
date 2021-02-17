import React, { useState, useEffect } from "react";
import { Switch, Route /* useHistory, useParams */ } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axiosWithAuth from "./utilities/axiosWithAuth";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [ht, setHt] = useState({});
  // const { push } = useHistory();
  // const { id } = useParams();

  const getMovieList = () => {
    axiosWithAuth()
      .get("/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    savedList.forEach((mv) => {
      setHt({ ...ht, [mv.title]: mv.title });
    });
  }, [savedList]);

  // trying to make it only add 1 movie with same name

  const addToSavedList = (movie) => {
    if (!(movie.title in ht)) {
      setSavedList([...savedList, movie]);
    }
  };
  // console.log("cd: App.js:  ht ", ht);

  //
  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList savedList={savedList} setSavedList={setSavedList} />
      <Switch>
        <Route exact path="/" render={() => <MovieList movies={movieList} />} />

        <Route
          path="/movies/:id"
          render={() => (
            <Movie
              addToSavedList={addToSavedList}
              movieList={movieList}
              setMovieList={setMovieList}
            />
          )}
        />

        <Route
          path="/update-movie/:id"
          render={() => (
            <UpdateMovie movieList={movieList} setMovieList={setMovieList} />
          )}
        />
        <Route
          path="/add-movie"
          render={() => (
            <AddMovie movieList={movieList} setMovieList={setMovieList} />
          )}
        />
       
      </Switch>
    </>
  );
};

export default App;
