import {Link} from "react-router-dom";

function ReviewThumbnailPane({review_likes_username, pane_title}) {
    return (
        <div className={"d-flex flex-column pt-5"}>
            <h3>{pane_title}</h3>
            <div className={"d-flex flew-row overflow-hidden position-relative"}>
                {review_likes_username.map((review, index) => (
                    <div className={"rounded bg-dark text-decoration-none text-white m-2 p-2 pe-4 ps-4"}>
                        <Link
                            key={index}
                            to={`/details/${review.movie_id}`}
                            className={"text-decoration-none text-white"}
                        >
                            <div className={"text-nowrap wd-font-size-large"}>{review.movie_title}</div>
                            <Link
                                key={review.username}
                                to={`/profile/${review.username}`}
                                className={"text-decoration-none text-secondary"}>
                                {review.username}
                            </Link>
                            <div>{review.review}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewThumbnailPane;