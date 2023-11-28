import {Link} from "react-router-dom";
import {FaStar} from "react-icons/fa";

function ReviewThumbnailPane({pane_title, review_likes_username}) {
    return (
        <div className={"d-flex flex-column pt-5"}>
            <h3>{pane_title}</h3>
            <div className={"d-flex flew-row overflow-auto"}>
                {review_likes_username.map((review, index) => (

                    <div className={"rounded bg-dark text-decoration-none text-white m-2 p-2 pe-4 ps-4"}>
                        <Link
                            key={index}
                            to={`/details/${review.movieId._id}`}
                            className={"text-decoration-none text-white"}
                        >
                            <div className={"text-nowrap wd-font-size-large"}>{review.movieId.title}</div>
                            <Link
                                key={review.username}
                                to={`/profile/${review.username}`}
                                className={"text-decoration-none text-secondary"}>
                                {review.username}
                            </Link>
                            <div>{review.text}</div>
                            <div className={"wd-star-rating"}>
                                {review.starRating} <span className={"me-2"}><FaStar color={"yellow"}/></span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewThumbnailPane;