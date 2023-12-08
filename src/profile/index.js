import { useState, useEffect } from "react";
import "./index.css";
import { FaCheckCircle, FaPlusCircle, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import StatModal from "./statModal";
import EditModal from "./editModal";
import * as reviewClient from "../MongoDBClients/reviewsClient.js";
import { useSelector } from "react-redux";
import * as reelsClient from "../MongoDBClients/reelsClient.js";
import ReelModal from "./reelModal";
import { useDispatch } from "react-redux";


function generateReelCard(reel, setSelectedReel, setNewReelModalOpen) {


  const handleEdit = () => {
    console.log("clicked")
    setSelectedReel(reel);
    setNewReelModalOpen(true);
  }

  const movies = reel.movies;
  return (
    <Link
      // Reels Details Page?
      // to={`/details/${reel.omdbMovieId}`}
      style={{ textDecoration: "none" }}
      className="w-50"
    >
      <div className="card w-50">
        <div className="card-body">
          <h5 className="card-title">{reel.title}
            <button onClick={handleEdit} className="float-end btn btn-outline-secondary">
              Edit
            </button>
          </h5>
          <h6 className="card-subtitle my-3 text-muted">
            Movies in Reel:
          </h6>
          <div className="card-text list-group">
            {movies.map((movie) => {
              return (
                <Link to={`/details/${movie.omdbId}`} style={{ textDecoration: "none" }}>
                  <p className="list-group-item border rounded reel-movie"><b>{movie.title}</b></p>
                </Link>)
            }
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

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
        <Link to={`/details/${review.movieId.omdbId}`} className="movie-links">
          <h5 className="card-title movie-links">{review.movieId.title}</h5>
        </Link>
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
  const [reels, setReels] = useState([]);

  const dispatch = useDispatch();

  const fetchReviews = async () => {
    const new_reviews = await reviewClient.findReviewsByUsername(
      currentUser.username,
    );
    setReviews(new_reviews);
  };

  const fetchReels = async () => {
    const all_reels = await reelsClient.findAllReels();
    const currentUserReelIds = currentUser.reels.map((reel) => reel._id);
    console.log("fetching currentUser Reels ", currentUserReelIds)
    const new_reels = all_reels.filter(reel => currentUserReelIds.includes(reel._id));
    setReels(new_reels);
  }

  const createNewReel = async () => {
    const newReel = await reelsClient.createReel({ title: "New Reel", movies: [] }, []);
    setReels([...reels, newReel]);

  }

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

  // State vars to control Modals
  const [statModalOpen, setStatModalOpen] = useState(false);
  const [EditModalOpen, setEditModalOpen] = useState(false);
  const [newReelModalOpen, setNewReelModalOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);

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
    fetchReels();
  }, [newReelModalOpen]);

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
                    <span className="number">
                      {currentUser.followers.length}
                    </span>
                  </div>

                  <div className="d-flex flex-column mx-2 stats">
                    <span className="">Reviews</span>
                    <span className="number">{reviews.count}</span>
                  </div>

                  <div className="d-flex flex-column mx-2 stats">
                    <span className="">Following</span>
                    <span className="number">
                      {currentUser.following.length}
                    </span>
                  </div>
                </div>
                <Modal
                  isOpen={statModalOpen}
                  onRequestClose={() => setStatModalOpen(false)}
                  style={modalStyle}
                >
                  <StatModal
                    setModal={setStatModalOpen}
                    account={currentUser}
                  />
                </Modal>
                <Modal
                  isOpen={EditModalOpen}
                  onRequestClose={() => setEditModalOpen(false)}
                  style={modalStyle}
                >
                  <EditModal
                    setModal={setEditModalOpen}
                    account={currentUser}
                  />
                </Modal>
                <Modal
                  isOpen={newReelModalOpen}
                  onRequestClose={() => setNewReelModalOpen(false)}
                  style={modalStyle}
                >
                  <ReelModal
                    setModal={setNewReelModalOpen}
                    selectedReel={selectedReel}
                    reels={reels}
                    setReels={setReels}
                  />
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
              <h2 className="m-2"> Your Reels <FaPlusCircle className="add-reels-btn mb-1" onClick={() => createNewReel()} /></h2>
              <div>
                {reels.map((reel) => {
                  return generateReelCard(reel, setSelectedReel, setNewReelModalOpen);
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 flex-grow-1 bd-highlight center-text">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <h2> All Reviews </h2>
                <div>
                  {generateAllUserReviews(reviews)}
                </div>
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
