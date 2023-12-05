import React from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import "./ItemComponent.css";

// Generate a movie card within the search results (center column)
function generateMovieCard(movie) {
  return (
    <div className="movie-container col-3">
      <Link to={`/details/${movie.imdbID}`}>
        {movie.Poster && <img src={movie.Poster} alt={movie.Title} />}
        <div className="movie-info">
          <div className="movie-title">{movie.Title}</div>
          <div className="movie-year">{movie.Year}</div>
        </div>
      </Link>
    </div>
  );
}

// Generate a user card within the search results (center column)
function generateUserCard(user) {
  return (
    <div className="card">
      <div className="card-body d-flex flex-row">
        <h5 className="card-title profile-pic">
          <Link className="profile-pic" to="/profile/1">
            {user.profilePic ? (
              <img src={user.profilePic} alt={user.username} />
            ) : (
              <FaUserAlt className="avatar" />
            )}
            {user.username}
          </Link>
        </h5>
        <div className="align-middle">
          <h6 className="card-subtitle mb-2 text-muted">
            Followers: {user.followers}
          </h6>
          {user.role === "ADMIN" && (
            <h6 className="card-subtitle mb-2 text-muted">Role: Admin</h6>
          )}
          {user.role === "USER" && (
            <h6 className="card-subtitle mb-2 text-muted">
              Following: {user.following && user.following.length}
            </h6>
          )}
          <h6 className="card-subtitle mb-2 text-muted">
            Posts: {user.reviews && user.reviews.length}
          </h6>
        </div>
      </div>
    </div>
  );
}

const ItemComponent = ({ item, type }) => {
  return (
    <>
      {type !== "users" && generateMovieCard(item)}
      {type === "users" && generateUserCard(item)}
    </>
  );
};

export default ItemComponent;
