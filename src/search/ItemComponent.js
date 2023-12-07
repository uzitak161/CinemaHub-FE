import React from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import "./ItemComponent.css";

// Generate a movie card within the search results (center column)
function generateMovieCard(movie) {
  return (
    <div className="item-container col-md-2 col-sm-3 col-5">
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

const UserList = (user) => {
  return (
    <Link  to={`/profile/${user.username}`} className="p-0 m-0 text-decoration-none ">
    <div key={user.username} className="user-item">
      {user.profilePic ? (
        <img src={user.profilePic} alt={`${user.username}'s profile`} className="profile-pic" />
      ) : (
        <FaUserAlt className="avatar-pic" />
      )}
      <div className="user-details">
        <div className="username">{user.username}</div>
        <div className="role">{user.role}</div>
        {user.role === 'USER' && (
          <div className="social-info">
            <span>Following: {user.following.length}</span>
            <span>Followers: {user.followers.length}</span>
          </div>
        )}
        {/* Display reels if needed */}
      </div>
    </div>
    </Link>
  );
};

// Generate a user card within the search results (center column)
function generateUserCard(user) {
  return UserList(user);
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
