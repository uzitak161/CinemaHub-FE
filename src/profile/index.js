
import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import './index.css';
import { Link } from "react-router-dom";


function Profile() {

    // This is temporary, will eventually use redux to store login status
    const [loggedIn, setStatus] = useState(true)

    // Lookup the users profile image if they have one (optional)
    const image = undefined;

    const followers = 10;
    const reviews = 20;
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
                            <span className="number">{reviews}</span>
                        </div>

                        <div className="d-flex flex-column mx-2 stats">
                            <span className="">Following</span>
                            <span className="number">{following}</span>
                        </div>
                    </div>
                    <input type="text" className="form-control my-2" placeholder="E-Mail" />
                    <textarea rows="4" className="form-control my-2" cols="50" placeholder="Enter your bio here..."></textarea>
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