import {Link} from "react-router-dom";
import {FaStar} from "react-icons/fa";

function ReviewPane({pane_title, reviews, movie_title}) {
    return (
        <div className={"d-flex flex-column pt-5"}>
            <h3>{pane_title}</h3>
            <div className={"d-flex flew-row overflow-auto position-relative"}>
                {reviews.map((review, index) => (

                    <Link
                        key={index}
                        to={`/profile/${review.username}`}
                        className={"text-decoration-none text-white"}
                    >
                        <div className={"rounded bg-dark text-decoration-none text-white m-2 p-2 pe-4 ps-4 position-relative"}>
                            <div className={"text-nowrap wd-font-size-large"}>{movie_title}</div>
                            <span className={"text-secondary"}>{review.username}</span>
                            <div>{review.text}</div>
                            <div>
                                {review.starRating} <span className={"me-2"}><FaStar color={"yellow"}/></span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ReviewPane;