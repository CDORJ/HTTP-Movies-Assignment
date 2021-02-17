import React from "react";
import { NavLink, Link } from "react-router-dom";

function SavedList({ savedList, setSavedList }) {
  // console.log("cd: SavedList.js: list props: ", list)

  const handleDelete = (id) => {
    console.log("This is the id from handleDelete", id);
    setSavedList(savedList.filter((mv) => {
     return mv.id !== id
   }))
  };

  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {savedList.map((movie) => {
        return (
          <>
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
          <button onClick={() => handleDelete(movie.id)}>Remove from Saved List</button>
          </>
        );
      })}
      <div className="home-button">
        <Link to="/">Home</Link>
      </div>
      <div className="home-button">
        <Link to="/add-movie">Add a Movie</Link>
      </div>
    </div>
  );
}

export default SavedList;
