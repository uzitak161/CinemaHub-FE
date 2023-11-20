
import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import './index.css';
import { Link } from "react-router-dom";
import Modal from "react-modal";
import StatModal from './statModal';



function generateAllUserReviews(reviews) {
    return (<div>
        {reviews.map((review) => {
            return generateReviewCard(review);
        })}
    </div>

    )

}


function generateRecommendations(reccomendations) {
    return (<div>
        {reccomendations.map((reccomendation) => {
            return generateRecommendationCard(reccomendation);
        })}
    </div>
    )
}


function generateRecommendationCard(reccomendation) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{reccomendation.movieTitle}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    Average Rating: {reccomendation.avg_rating} <span className='stars'>★</span>
                </h6>
                <p className="card-text">{reccomendation.description}</p>
            </div>
        </div>
    )
};



// We can give this a review object and it will render the review
function generateReviewCard(review) {


    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{review.movieTitle}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {Array.from({ length: review.rating }, (_, index) => (
                        <span className="stars" key={index}>★</span>
                    ))}
                </h6>
                <p className="card-text">{review.review}</p>
            </div>
        </div>
    )
}


function Profile() {

    // This is temporary, will eventually use redux to store login status
    const [loggedIn, setStatus] = useState(true)
    const [reviews, setReviews] = useState([{ movieTitle: "Pulp Fiction", rating: 5, review: "This movie was great!" }, { movieTitle: "Pulp Fiction", rating: 5, review: "This movie was great!" }])
    const [recommendations, setRecommendations] = useState([{ movieTitle: "Pulp Fiction", avg_rating: 4.78, description: "Movie Description" }, { movieTitle: "Pulp Fiction", avg_rating: 4.78, description: "Movie Description" }])
    const [modalOpen, setModalOpen] = useState(true);


    // Lookup the users profile image if they have one (optional)
    const image = undefined;

    const followers = 10;
    const reviewCount = 20;
    const following = 30;

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
            overflow: 'auto', // scroll if content is too long
        },
    };


    if (loggedIn) {
        return (
            <div className='d-flex bd-highlight'>
                <div className='p-2 flex-fill bd-highlight'>
                    <div className='row'>
                        <div className='col'>
                            <div className='bio-area form-group'>
                                {image ? image : <FaUserAlt className='avatar' />}
                                <div onClick={() => setModalOpen(true)} className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                    <div className="d-flex flex-column mx-2 stats">
                                        <span className="">Followers</span>
                                        <span className="number">{followers}</span>
                                    </div>

                                    <div className="d-flex flex-column mx-2 stats">
                                        <span className="">Reviews</span>
                                        <span className="number">{reviewCount}</span>
                                    </div>

                                    <div className="d-flex flex-column mx-2 stats">
                                        <span className="">Following</span>
                                        <span className="number">{following}</span>
                                    </div>
                                </div>
                                <Modal
                                    isOpen={modalOpen}
                                    onRequestClose={() => setModalOpen(false)}
                                    style={modalStyle}
                                >
                                    <StatModal setModal={setModalOpen} />


                                </Modal>
                                <input type="text" className="form-control my-2" placeholder="E-Mail" />
                                <textarea rows="4" className="form-control my-2" cols="50" placeholder="Enter your bio here..."></textarea>
                            </div>
                        </div>
                        <div className='col'>
                            <h2> Reccomendations </h2>
                            {generateRecommendations(recommendations)}
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col'>
                            <h2> Your Recent Reviews </h2>
                            {generateAllUserReviews(reviews)}
                        </div>
                    </div>

                </div>

                <div className='p-2 d-flex bd-highlight center-text'>
                    <h2> Your Recent Reviews </h2>
                </div>

            </div>


        )
    } else {
        return (
            <div>
                <h1>Not Logged In</h1>
                <Link to={`/login`}>Navigate to Login Screen to login or signup</Link>
            </div>
        )
    };
}


export default Profile;