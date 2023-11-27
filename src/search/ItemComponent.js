import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ItemComponent.css';

const ItemComponent = ({ item, type }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = () => {
    if (type === 'movie') {
      setShowOverlay(!showOverlay);
    }
    // Additional actions for user type if needed
  };
  return (
    <div className="movie-container col-3" onClick={handleClick}>
      {type === 'movies' && (
        <Link to={`/details/${item._id}`}>
          {item.primaryImage && <img src={item.primaryImage.url} alt={item.title}
            className={"" + showOverlay ? 'darken' : ''} />}
          {showOverlay && <div className="item-title">{item.title}</div>}
        </Link>
      )}
      {type === 'users' &&
        (
          <Link to={`/profile/${item._username}`}>
            <div className="user-info">
              {/* Display user information here */}
              <div>{item._username}</div>
            </div>
          </Link>
        )}
    </div>
  );
};

export default ItemComponent;