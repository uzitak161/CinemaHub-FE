import { useParams } from "react-router-dom";
import * as reviewClient from "../MongoDBClients/reviewsClient";
import * as moviesClient from "../MongoDBClients/moviesClient";
import { useEffect, useState } from "react";
import "./styles.css";
import ReviewPane from "./ReviewPane";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import * as omdbClient from "../OMDbAPI/client";
import Reels from "./Reels";

function Details() {
  const { currentUser } = useSelector((state) => state.user);
  const { did } = useParams();
  const defaultReview = {
    username: currentUser ? currentUser.username : "ERROR",
    text: "",
    starRating: 1,
    createdAt: new Date(),
  };
  const [review, setReview] = useState(defaultReview);
  const [movie, setMovie] = useState({});
  const [movieReviews, setMovieReviews] = useState([]);
  const fetchMovie = async () => {
    const cachedMovie = await moviesClient.findMovieByOmdbID(did);
    console.log("Cached Movie: ", JSON.stringify(cachedMovie));
    if (cachedMovie == null) {
      const response = await omdbClient.findMovieById(did);
      const savedMovie = await moviesClient.createMovie({
        title: response.Title,
        plot: response.Plot,
        poster: response.Poster,
        omdbId: did,
      });
      setMovie(savedMovie);
      setMovieReviews([]);
    } else {
      setMovie(cachedMovie);
      setMovieReviews(await reviewClient.findReviewsByMovieId(cachedMovie._id));
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [review]);

  const saveReview = async () => {
    console.log("Current User: ", JSON.stringify(currentUser));
    if (currentUser === "") {
      alert("You must be logged in to leave a review!");
      setReview(defaultReview);
      return;
    } else {
      const cachedMovie = await moviesClient.findMovieByOmdbID(did);
      await reviewClient.createReview(review, cachedMovie._id);
    }
    setReview(defaultReview);
  };
  return (
    <div>
      <div className={"d-fex flex-column position-relative"}>
        {movie && (
          <div className={"d-flex flex-row"}>
            <div className={"pe-3"}>
              <img
                className={"wd-details-poster"}
                src={movie.poster}
                alt={movie.title}
              />
            </div>
            <div className={"flex-grow-1 d-flex flex-column"}>
              <div className={"text-center p-2"}>
                <h1 className={"wd-movie-title"}>{movie.title}</h1>
                <h4>{movie.plot}</h4>
              </div>
              <div className={"bg-secondary text-white rounded p-2 me-2"}>
                <div className={"d-flex flex-row justify-content-between"}>
                  <div className={"ms-2"}>
                    <label for={"star-rating"}>Star Rating</label>
                    <input
                      className="form-control"
                      id={"star-rating"}
                      onChange={(e) =>
                        setReview({
                          ...review,
                          starRating: e.target.valueAsNumber,
                        })
                      }
                      value={review.starRating}
                      type={"number"}
                      min={1}
                      max={5}
                    ></input>
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
              movie_title={movie.title}
            />
          )}
        </div>
        <div>{currentUser !== "" && <Reels movieId={movie._id} />}</div>
      </div>
    </div>
  );
}

export default Details;
