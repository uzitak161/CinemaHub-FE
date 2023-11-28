import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";



function StatModal({ setModal }) {

    const followers = [{ id: 1, name: 'John Doe', image: 'https://via.placeholder.com/150' }, { id: 2, name: 'Jane Doe', image: 'https://via.placeholder.com/150' }];

    return (
        <div className='row'>
            <div className="col center-text">
                <h2 className="mb-2" >Followers</h2>
                <ul>
                    {followers.map((follower) => {
                        return (
                            <Link
                                onClick={() => { setModal(false) }}
                                to={`/profile/${follower.id}`}
                                style={{textDecoration: "none"}}>
                                <div className="row mt-2">
                                    <div className="col">
                                        {/* <img src={follower.image} alt="follower" /> */}
                                        <FaUserAlt className='avatar' style={{textDecoration: "none", color: "black"}}/>
                                    </div>
                                    <div className="col">
                                        <p style={{textDecoration: "none", color: "black"}}>{follower.name}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    }
                </ul>
            </div>

            <div className="col center-text">
                <h2 className="mb-2" >Following</h2>
                <ul>
                    {followers.map((follower) => {
                        return (
                            <Link
                                onClick={() => { setModal(false) }}
                                to={`/profile/${follower.id}`}
                                style={{textDecoration: "none"}}>
                                <div className="row mt-2">
                                    <div className="col">
                                        {/* <img src={follower.image} alt="follower" /> */}
                                        <FaUserAlt className='avatar' style={{textDecoration: "none", color: "black"}}/>
                                    </div>
                                    <div className="col">
                                        <p style={{textDecoration: "none", color: "black"}}>{follower.name}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    }

                </ul>
            </div>

            <button className="btn btn-danger float-end modal-quit" onClick={() => setModal(false)}><FaArrowRight /></button>
        </div>
    )
}

export default StatModal;