import { useParams } from "react-router-dom";
import * as omdbClient from "../OMDbAPI/client";
import * as reviewClient from "../MongoDBClients/Reviews/client";
import { useEffect, useState } from "react";
import "./styles.css";
import ReviewPane from "./ReviewPane";
import { FaCheckCircle } from "react-icons/fa";

function Details() {
  const { did } = useParams();

  // TODO change this for sign in and what not
  const [username, setUsername] = useState("user1");

  const [omdbDetails, setOmdbDetails] = useState({});
  const fetchOmdbDetails = async () => {
    setOmdbDetails(await omdbClient.findMovieById(did));
  };
  const [movieReviews, setMovieReviews] = useState([]);
  const fetchMovieReviews = async () => {
    setMovieReviews(await reviewClient.findReviewByMovieId(did));
  };

  const [review, setReview] = useState({
    movieId: did,
    username: username,
    text: "",
    starRating: 0,
    createdAt: new Date(),
  });

  useEffect(() => {
    fetchOmdbDetails();
    fetchMovieReviews();
  }, [review]);

  const saveReview = async () => {
    if (username) {
      console.log("Saving review" + JSON.stringify(review));
      const response = await reviewClient.createReview(review);
      console.log(response);
      setReview({
        movieId: did,
        username: username,
        text: "",
        starRating: 0,
        createdAt: new Date(),
      });
      fetchOmdbDetails();
    } else {
      console.log("Please sign in to leave a review");
      setReview({
        ...review,
        text: "Please sign in to leave a review",
        starRating: 1,
      });
    }
  };
  return (
    <div>
      <div className={"d-fex flex-column position-relative"}>
        {omdbDetails && (
          <div className={"d-flex flex-row"}>
            <div className={"pe-3"}>
              <img
                className={"wd-details-poster"}
                src={omdbDetails.Poster}
                alt={omdbDetails.Title}
              />
            </div>
            <div className={"flex-grow-1 d-flex flex-column"}>
              <div className={"text-center p-2"}>
                <h1 className={"wd-movie-title"}>{omdbDetails.Title}</h1>
                <h4>{omdbDetails.Plot}</h4>
              </div>
              <div className={"bg-secondary text-white rounded p-2 me-2"}>
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
                  <h3>Write a Review</h3>
                  <button className={"btn"} onClick={() => saveReview()}>
                    <FaCheckCircle color={"green"} size={40} />
                  </button>
                </div>
                <div className={"m-2 pb-2"}>
                  <textarea
                    className="form-control"
                    rows="6"
                    onChange={(e) =>
                      setReview({ ...review, text: e.target.value })
                    }
                    value={review.text}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={"d-flex flex-column"}>
          {movieReviews && (
            <ReviewPane
              pane_title={"CinemaHub Reviews"}
              reviews={movieReviews}
              movie_title={omdbDetails.Title}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
