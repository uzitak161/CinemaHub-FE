import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import '../index.css';
import Modal from "react-modal";
import StatModal from '../statModal';

function ProfileSpecific() {

    // This is temporary, will eventually use redux to store login status
    const [loggedIn, setStatus] = useState(true)
    const [reviews, setReviews] = useState([{ movieTitle: "Pulp Fiction", rating: 5, review: "This movie was great!" }, { movieTitle: "Pulp Fiction", rating: 5, review: "This movie was great!" }])
    const [modalOpen, setModalOpen] = useState(false);

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

    const getRecent = (array) => {
        if (array.length < 3) {
            return array;
        } else {
            return array.slice(0, 3);
        }
    }


    return (
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
                            <h2> Other Field </h2>
                            
                        </div>
                    </div>
    )
}

export default ProfileSpecific;