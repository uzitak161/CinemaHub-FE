import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import * as reviewClient from "../MongoDBClients/reviewsClient";
import "./styles.css";

function AdminReviews() {
  const [review, setReview] = useState({
    username: "",
    text: "",
    starRating: -1,
    createdAt: null,
  });
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    setReviews(await reviewClient.findAllReviews());
  };

  const saveReview = async () => {
    if (review._id) {
      try {
        await reviewClient.updateReview(review._id, review);
      } catch (e) {
        console.error(e);
      }
    } else {
      await reviewClient.createReview(review, review.movieId._id);
    }
    setReview({
      username: "",
      text: "",
      starRating: -1,
      createdAt: null,
    });
  };

  const handleReviewDelete = async (reviewId) => {
    console.log(reviewId);
    const response = await reviewClient.deleteReview(reviewId);
    console.log(response);
    setReview({
      username: "",
      text: "",
      starRating: -1,
      createdAt: null,
    });
  };

  useEffect(() => {
    fetchReviews();
  }, [review]);
  return (
    <div>
      <div className={"bg-secondary text-white rounded p-2 me-2 ms-2"}>
        <div className={"d-flex flex-row justify-content-between"}>
          <div className={"ms-2"}>
            <label for={"star-rating"}>Star Rating</label>
            <select
              className="form-select"
              id={"star-rating"}
              onChange={(e) =>
                setReview({ ...review, starRating: e.target.value })
              }
              value={review.starRating}
            >
              <option selected value="1">
                1
              </option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <h3>Edit a Review</h3>
          <button className={"btn"} onClick={() => saveReview()}>
            <FaCheckCircle color={"green"} size={40} />
          </button>
        </div>
        <div className={"m-2 pb-2"}>
          <textarea
            className="form-control"
            rows="6"
            onChange={(e) => setReview({ ...review, text: e.target.value })}
            value={review.text}
          ></textarea>
        </div>
      </div>
      <div className={"d-flex flex-column"}>
        {reviews.map((review, index) => (
          <div
            className={
              "rounded bg-dark text-decoration-none text-white m-2 p-2 pe-4 ps-4 d-flex flex-row"
            }
          >
            <div>
              <div className={"text-nowrap wd-font-size-large"}>
                {review.movieId.title}
              </div>
              <span className={"text-secondary"}>{review.username}</span>
              <div>{review.text}</div>
              <div>
                {Array.from({ length: review.starRating }, (_, index) => (
                  <span style={{ color: "yellow" }} key={index}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-grow-1 text-end text-nowrap">
              <button
                className={"btn btn-light me-2"}
                onClick={() => {
                  setReview(review);
                }}
              >
                Edit
              </button>
              <button
                className={"btn btn-danger"}
                onClick={() => handleReviewDelete(review._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReviews;
