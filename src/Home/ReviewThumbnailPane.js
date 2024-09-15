import {Link} from "react-router-dom";

function ReviewThumbnailPane({pane_title, reviews}) {
    return (
        <div className={"d-flex flex-column pt-5"}>
            <div className={"rounded wd-bg-light-grey p-3"}>
                <h3>{pane_title}</h3>
                {reviews.length === 0 ? (
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
                    <div className={"d-flex flew-row overflow-auto"}>
                        {reviews.map((review, index) => (
                            <div
                                className={
                                    "rounded bg-dark text-decoration-none text-white m-2 p-2 pe-4 ps-4 wd-min-width-300"
                                }
                            >
                                <Link
                                    key={index}
                                    to={`/details/${review.movieId.omdbId}`}
                                    className={"text-decoration-none text-white"}
                                >
                                    <div className={"text-nowrap wd-font-size-large text-truncate"}>
                                        {review.movieId.title}
                                    </div>
                                    <Link
                                        key={review.username}
                                        to={`/profile/${review.username}`}
                                        className={"text-decoration-none text-secondary"}
                                    >
                                        {review.username}
                                    </Link>
                                    <div className={"text-truncate"}>{review.text}</div>
                                    <div className={"wd-star-rating"}>
                                        {Array.from({length: review.starRating}, (_, index) => (
                                            <span style={{color: "yellow"}} key={index}>
                      ★
                    </span>
                                        ))}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReviewThumbnailPane;
