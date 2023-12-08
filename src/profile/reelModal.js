import { useState, useEffect } from "react";
import { setCurrentUser } from "../Login/reducer";
import * as reelsClient from "../MongoDBClients/reelsClient.js";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";

function ReelModal({ setModal, selectedReel, reels, setReels }) {
    const [formData, setFormData] = useState(selectedReel);

    const currentUser = (state) => state.currentUser;
    const dispatch = useDispatch();

    useEffect(() => {setFormData(selectedReel) }, []); // Empty dependency array ensures this effect runs only once on mount


    const handleDelete =  (id) => {
        formData.movies = formData.movies.filter((movie) => movie._id !== id);
        setFormData({
            ...formData,
            movies: formData.movies
        })
        console.log(formData)
    }

    const handleDeleteReel = async () => {
        const response = await reelsClient.deleteReel(selectedReel._id);
        setModal(false);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Get only IDs of movies
        const movieIds = formData.movies.map((movie) => movie._id);
        setFormData({ ...formData, movies: movieIds });
        const response = await reelsClient.updateReel(selectedReel._id, formData);
        console.log(response)
        setModal(false);

    };

    return (
        <div className="container mt-2">
            <h1 className="text-center">Editing Reel "{selectedReel.title}"</h1>
            <div>
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

                <div className="mb-3 list-group">
                    {formData.movies.map(
                        (movie) => (
                            <div className="list-group-item">
                                {movie.title}
                                <button
                                    className={"wd-min-height-50 btn float-end"}
                                    onClick={() => handleDelete(movie._id)}
                                >
                                    <FaTrash size={40} color={"red"} />
                                </button>
                            </div>
                        )
                    )}
                </div>
                <button className="float-end btn btn-success" onClick={handleSubmit}>Submit</button>
                <button className="float-end btn btn-danger me-2" onClick={() => handleDeleteReel()}>Delete Reel</button>
            </div>

        </div>
    );
}

export default ReelModal;
