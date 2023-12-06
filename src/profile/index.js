import { useState, useEffect } from "react";
import "./index.css";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import StatModal from "./statModal";
import EditModal from "./editModal";
import * as reviewClient from "../MongoDBClients/reviewsClient.js";
import { useSelector } from "react-redux";

function generateAllUserReviews(reviews) {
  return (
    <div>
      {reviews.map((review) => {
        return generateReviewCard(review);
      })}
    </div>
  );
}

function generateRecommendations(reccomendations) {
  return (
    <div>
      {reccomendations.map((reccomendation) => {
        return generateRecommendationCard(reccomendation);
      })}
    </div>
  );
}

function generateRecommendationCard(reccomendation) {
  return (
    <Link
      to={`/details/${reccomendation.omdbMovieId}`}
      style={{ textDecoration: "none" }}
      className=""
    >
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{reccomendation.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Average Rating: {reccomendation.rating}{" "}
            <span className="stars">★</span>
          </h6>
          <p className="card-text">{reccomendation.description}</p>
        </div>
      </div>
    </Link>
  );
}

// We can give this a review object and it will render the review
function generateReviewCard(review) {
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const formattedDate = new Date(review.createdAt).toLocaleString(
    "en-US",
    dateOptions,
  );

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{review.movieId.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {Array.from({ length: review.starRating }, (_, index) => (
            <span className="stars" key={index}>
              ★
            </span>
          ))}
        </h6>
        <p className="card-text">{review.text}</p>
        <p className="float-end mb-0">Created At: {formattedDate}</p>
      </div>
    </div>
  );
}

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const new_reviews = await reviewClient.findReviewsByUsername(
      currentUser.username,
    );
    setReviews(new_reviews);
  };

  const [recommendations, setRecommendations] = useState([
    {
      movieTitle: "Pulp Fiction",
      avg_rating: 4.78,
      description: "Movie Description",
    },
    {
      movieTitle: "Pulp Fiction",
      avg_rating: 4.78,
      description: "Movie Description",
    },
  ]);
  const [statModalOpen, setStatModalOpen] = useState(false);
  const [EditModalOpen, setEditModalOpen] = useState(false);

  const getRecommendations = async () => {
    let reviews = await reviewClient.findAllReviews();
    reviews = reviews.sort((a, b) => {
      return b.rating - a.rating;
    });
    let recs = [];
    if (reviews.length > 3) {
      recs = reviews.slice(0, 3);
    } else {
      recs = reviews;
    }
    setRecommendations(recs);
  };

  // Lookup the users profile image if they have one (optional)
  const image = undefined;

  useEffect(() => {
    getRecommendations();
    fetchReviews();
  }, []);

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: "50%",
      overflow: "auto", // scroll if content is too long
    },
  };

  const getRecent = (array) => {
    let sorted = array.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    if (sorted.length < 3) {
      return sorted;
    } else {
      return sorted.slice(0, 3);
    }
  };

  if (currentUser) {
    return (
      <div className="d-flex bd-highlight">
        <div className="p-2  bd-highlight">
          <div className="row">
            <div className="col">
              <div className="bio-area form-group">
                {image ? (
                  image
                ) : (
                  <FaUserAlt
                    className="avatar"
                    onClick={() => setEditModalOpen(true)}
                  />
                )}
                <div
                  onClick={() => setStatModalOpen(true)}
                  className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats"
                >
                  <div className="d-flex flex-column mx-2 stats">
                    <span className="">Followers</span>
                    <span className="number">{currentUser.followers.length}</span>
                  </div>

                  <div className="d-flex flex-column mx-2 stats">
                    <span className="">Reviews</span>
                    <span className="number">{reviews.count}</span>
                  </div>

                  <div className="d-flex flex-column mx-2 stats">
                    <span className="">Following</span>
                    <span className="number">{currentUser.following.length}</span>
                  </div>
                </div>
                <Modal
                  isOpen={statModalOpen}
                  onRequestClose={() => setStatModalOpen(false)}
                  style={modalStyle}
                >
                  <StatModal setModal={setStatModalOpen} account={currentUser} />
                </Modal>
                <Modal
                  isOpen={EditModalOpen}
                  onRequestClose={() => setEditModalOpen(false)}
                  style={modalStyle}
                >
                  <EditModal setModal={setEditModalOpen} account={currentUser} />
                </Modal>
                <h3 className="mt-2">{currentUser.username}</h3>
                <textarea
                  readOnly
                  rows="4"
                  className="form-control my-2"
                  cols="50"
                  placeholder="No Bio/Description Currently Set"
                  value={currentUser.bio}
                ></textarea>
              </div>
            </div>
            <div className="col">
              <h2> Reccomendations </h2>
              {generateRecommendations(recommendations)}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <h2> Your Recent Reviews </h2>
              {generateAllUserReviews(getRecent(reviews))}
            </div>
          </div>
        </div>

        <div className="p-2 flex-grow-1 bd-highlight center-text">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <h2> All Reviews </h2>
                {generateAllUserReviews(reviews)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Not Logged In</h1>
        <Link to={`/login`}>Navigate to Login Screen to login or signup</Link>
      </div>
    );
  }
}

export default Profile;
