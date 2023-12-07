import { useState, useEffect } from "react";
import { setCurrentUser } from "../Login/reducer";
import * as userClient from "../MongoDBClients/usersClient.js";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";

function ReelModal({ setModal, selectedReel, reels, setReels }) {
    const [formData, setFormData] = useState(selectedReel);

    const dispatch = useDispatch();

    useEffect(() => { }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

    };

    return (
        <div className="container mt-2">
            <h1 className="text-center">Editing Reel "{selectedReel.title}"</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value="placeholder"
                        // onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    {formData.movies.map(
                        (movie) => (
                            <div className="d-flex flex-row rounded m-2 p-2 pe-4 ps-4">
                                <div className="align-self-center wd-font-size-large">
                                    {movie.title}
                                </div>
                                <div>
                                    <button
                                        className={"wd-min-height-50 btn float-end"}

                                    >
                                        <FaTrash size={40} color={"red"} />
                                    </button>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </form>

        </div>
    );
}

export default ReelModal;
