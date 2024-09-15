import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './index.css';
const MovieComponent = ({ movie, currentUser }) => {
    return (
        <div className="wd-search-item-container col-md-2 col-sm-3 col-5">
            <Link to={`/details/${movie.imdbID}`}>
                {movie.Poster && <img src={movie.Poster !== "N/A" ? movie.Poster : "/images/MoviePlaceholder.png"} alt={movie.Title} />}
                <div className="wd-movie-search-info">
                    <div className="wd-movie-search-title">{movie.Title}</div>
                    <div className="wd-movie-search-year">{movie.Year}</div>
                </div>
                {currentUser && currentUser.role !== "ADMIN" && movie.isInReels && (
                    <div className="wd-movie-reels-indicator">
                        <FaStar className={"wd-reel-icon" + (currentUser.username === movie.isInReels.username ? " wd-reel-icon-you" : " wd-reel-icon-other")} />
                        <div className="wd-inreel-tooltip">
                            <span className='wd-inreel-tooltiptext'>{`In ${currentUser.username !== movie.isInReels.username ? "Friend " : ""}Reel: ${movie.isInReels.title}`}</span>
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );

};

export default MovieComponent;