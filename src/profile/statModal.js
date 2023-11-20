import { FaArrowRight } from "react-icons/fa";



function StatModal({ setModal }) {

    const followers = [{ name: 'John Doe', image: 'https://via.placeholder.com/150' }, { name: 'Jane Doe', image: 'https://via.placeholder.com/150' }, { name: 'Jane Doe', image: 'https://via.placeholder.com/150' }, { name: 'Jane Doe', image: 'https://via.placeholder.com/150' }, { name: 'Jane Doe', image: 'https://via.placeholder.com/150' }];

    return (
        <div className='row'>
            <div className="col center-text">
                <h2 className="mb-2" >Followers</h2>
                {followers.map((follower) => {
                    return (
                        <div className="row">
                            <div className="col">
                                <img src={follower.image} alt="follower" />
                            </div>
                            <div className="col">
                                <p>{follower.name}</p>
                            </div>
                        </div>
                    )
                })
                }
            </div>

            <div className="col center-text">
                <h2 className="mb-2" >Following</h2>
                {followers.map((follower) => {
                    return (
                        <div className="row">
                            <div className="col">
                                <img src={follower.image} alt="follower" />
                            </div>
                            <div className="col">
                                <p>{follower.name}</p>
                            </div>
                        </div>
                    )
                })
                }
            </div>

            <button className="btn btn-danger float-end modal-quit" onClick={() => setModal(false)}><FaArrowRight /></button>
        </div>
    )
}

export default StatModal;