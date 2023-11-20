
import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import './index.css';
import { Link } from "react-router-dom";


function generateAllUserReviews(reviews) {
    return (<div>
        {reviews.map((review) => {
            return generateReviewCard(review);
        })}
    </div>

    )

}



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

    // Lookup the users profile image if they have one (optional)
    const image = undefined;

    const followers = 10;
    const reviewCount = 20;
    const following = 30;


    if (loggedIn) {
        return (
            <div>
                <div className='bio-area form-group'>
                    {image ? image : <FaUserAlt className='avatar' />}
                    <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
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
                    <input type="text" className="form-control my-2" placeholder="E-Mail" />
                    <textarea rows="4" className="form-control my-2" cols="50" placeholder="Enter your bio here..."></textarea>
                </div>

                <h2> Your Reviews </h2>
                {generateAllUserReviews(reviews)}
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