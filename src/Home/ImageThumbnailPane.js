import { Link } from "react-router-dom";
import "./styles.css";

function ImageThumbnailPane({ movies, pane_title }) {
  return (
    <div className={"d-flex flex-column pt-5"}>
      <h3>{pane_title}</h3>
      <div className={"d-flex flex-row overflow-auto"}>
        {movies.map((movie, index) => (
          <Link key={index} to={`/details/${movie.omdbId}`}>
            <img
              className={"wd-thumbnail-pane-image p-1"}
              src={movie.poster}
              alt={movie.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ImageThumbnailPane;
