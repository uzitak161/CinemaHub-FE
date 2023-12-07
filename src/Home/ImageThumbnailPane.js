import {Link} from "react-router-dom";
import "./styles.css";

function ImageThumbnailPane({movies, pane_title}) {
    return (
        <div className={"d-flex flex-column pt-5"}>
            <div className={"rounded wd-bg-light-grey p-3"}>
                <h3>{pane_title}</h3>
                {console.log(movies)}
                {movies.length === 0 ? (
                    <div className={"text-center"}>
                        <Link
                            to={"/Search"}
                            key={"search"}
                            className={"btn btn-lg btn-success m-3"}
                        >
                            Search for movies and new friends!
                        </Link>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    );
}

export default ImageThumbnailPane;
