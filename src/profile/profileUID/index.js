import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import "../index.css";
import Modal from "react-modal";
import StatModal from "../statModal";
import * as clientUser from "../../MongoDBClients/usersClient";
import * as reviewClient from "../../MongoDBClients/reviewsClient.js";
import { useParams } from "react-router-dom";
import * as userClient from "../../MongoDBClients/usersClient";

function generateAllUserReviews(reviews) {
  return (
    <div>
      {reviews.map((review) => {
        return generateReviewCard(review);
      })}
    </div>
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

function ProfileSpecific() {
  const { id } = useParams();
  const [account, setAccount] = useState(undefined);
  const [reviews, setReviews] = useState([]);

  const fetchAccount = async () => {
    const new_account = await clientUser.findUserByUsername(id);
    setAccount(new_account);
  };

  const fetchReviews = async () => {
    const new_reviews = await reviewClient.findReviewsByUsername(id);
    setReviews(new_reviews);
  };

  // Modal open status
  const [modalOpen, setModalOpen] = useState(false);

  // Lookup the users profile image if they have one (optional)
  const image = undefined;
  
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
    if (!array) {
      return [];
    }
    if (array.length < 3) {
      return array;
    } else {
      return array.slice(0, 3);
    }
  };

  const handleStatModalClose = () => {
    setModalOpen(false);
    fetchAccount();
  }


  useEffect(() => {
    fetchAccount();
    fetchReviews();
  }, [id]);

  const handleFollow = async () => {
    const new_user = await userClient.followUser(account.username);
    console.log(new_user); 
    setAccount(new_user);
  };

  if (account) {
    return (
      <div className="row">
        <div className="col">
          <div className="bio-area form-group">
            {image ? (
              image
            ) : (
              <FaUserAlt
                className="avatar nohover"
                style={{ textDecocation: "none" }}
              />
            )}
            <div>
              <button onClick={handleFollow} className="btn btn-success mt-2">
                Follow
              </button>
            </div>
            <div
              onClick={() => setModalOpen(true)}
              className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats"
            >
              <div className="d-flex flex-column mx-2 stats">
                <span className="">Followers</span>
                <span className="number">{account.followers.length}</span>
              </div>

              <div className="d-flex flex-column mx-2 stats">
                <span className="">Reviews</span>
                <span className="number">{reviews.length}</span>
              </div>

              <div className="d-flex flex-column mx-2 stats">
                <span className="">Following</span>
                <span className="number">{account.following.length}</span>
              </div>
            </div>
            <Modal
              isOpen={modalOpen}
              onRequestClose={() => handleStatModalClose()}
              style={modalStyle}
            >
              <StatModal setModal={setModalOpen} account={account}/>
            </Modal>
            <h3 className="mt-2">{account.username}</h3>
            <textarea
              readOnly
              rows="4"
              className="form-control my-2"
              cols="50"
              placeholder="Enter your bio here..."
              value="Specific User's bio "
            ></textarea>
          </div>
        </div>
        <div className="col">
          <h2> {account.username}'s Reviews </h2>
          {generateAllUserReviews(getRecent(reviews))}
        </div>
      </div>
    );
  } else {
    return <div>User Does not exist</div>;
  }
}

export default ProfileSpecific;
