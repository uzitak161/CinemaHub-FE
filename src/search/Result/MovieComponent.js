import React from 'react';
import { FaStar } from 'react-icons/fa'; // Icon for the heart
import { Link } from 'react-router-dom';

const MovieComponent = ({ movie }) => {
    return (
        <div className="wd-search-item-container col-md-2 col-sm-3 col-5">
            <Link to={`/details/${movie.imdbID}`}>
                {movie.Poster && <img src={movie.Poster} alt={movie.Title} />}
                <div className="wd-movie-search-info">
                    <div className="wd-movie-search-title">{movie.Title}</div>
                    <div className="wd-movie-search-year">{movie.Year}</div>
                </div>
                {movie.isInReels && (
                    <div className="wd-movie-reels-indicator">
                        <FaStar className="wd-star-reel-icon" />
                        <div className="wd-inreel-tooltip">
                            <span className='wd-inreel-tooltiptext'>{`In Reel: ${movie.isInReels.title}`}</span>
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );

};

export default MovieComponent;