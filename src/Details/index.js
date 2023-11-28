import {useParams} from "react-router-dom";
import * as omdbClient from "../OMDbAPI/client";
import * as mongoMovieClient from "../MongoDBClients/Movies/client";
import * as mongoCommentClient from "../MongoDBClients/Comments/client";
import {useEffect, useState} from "react";
import "./styles.css";
import ReviewPane from "./ReviewPane";
import {FaCheckCircle} from "react-icons/fa";

function Details() {
    const {did} = useParams()
    const [omdbDetails, setOmdbDetails] = useState({});
    const [mongoDetails, setMongoDetails] = useState({});
    const fetchOmdbDetails = async () => {
        setOmdbDetails(await omdbClient.findMovieById(did));
        console.log("OMDB Details " + JSON.stringify(omdbDetails));
    }
    const fetchMongoDetails = async () => {
        setMongoDetails(await mongoMovieClient.findMovieByOMDBId(did));
        console.log("Mongo details " + JSON.stringify(mongoDetails));
    }
    // TODO change this for sign in and what not
    const [username, setUsername] = useState("user2");

    useEffect(() => {
        fetchOmdbDetails();
        fetchMongoDetails();
    }, []);

    const [review, setReview] = useState({
        "movieId": null,
        "commentId": new Date().getTime(),
        "username": username,
        "text": "",
        "starRating": 0,
        "createdAt": new Date(),
    });

    const saveReview = async () => {
        if (username && mongoDetails && mongoDetails._id) {
            setReview({...review, movieId: mongoDetails._id});
            console.log("Saving review" + JSON.stringify(review));
            const response = await mongoCommentClient.createComment(review);
            console.log(response);
            setReview({})
            fetchOmdbDetails();
        } else {
            console.log("Please sign in to leave a review");
            setReview({...review, text: "Please sign in to leave a review", starRating: 1});
        }
    }
    return (
        <div>
            <div className={"d-fex flex-column position-relative"}>
                {omdbDetails &&
                    <div className={"d-flex flex-row"}>
                        <div className={"pe-3"}>
                            <img className={"wd-details-poster"} src={omdbDetails.Poster} alt={omdbDetails.Title}/>
                        </div>
                        <div className={"flex-grow-1 d-flex flex-column"}>
                            <div className={"text-center p-2"}>
                                <h1 className={"wd-movie-title"}>{omdbDetails.Title}</h1>
                                <h4>{omdbDetails.Plot}</h4>
                            </div>
                            <div className={"bg-secondary text-white rounded p-2 me-2"}>
                                <div className={"d-flex flex-row justify-content-between"}>
                                    <div className={"ms-2"}>
                                        <label for={"star-rating"}>Star Rating</label>
                                        <select
                                            className="form-select"
                                            id={"star-rating"}
                                            onChange={(e) => setReview({...review, starRating: e.target.value})}
                                            value={review.starRating}
                                        >
                                            <option selected value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <h3>Write a Review</h3>
                                    <button
                                        className={"btn"}
                                        onClick={() => saveReview()}>
                                        <FaCheckCircle color={"green"} size={40}/>
                                    </button>
                                </div>
                                <div className={"m-2 pb-2"}>
                                    <textarea
                                        className="form-control"
                                        rows="6"
                                        onChange={(e) => setReview({...review, text: e.target.value})}
                                        value={review.text}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>}
                <div className={"d-flex flex-column"}>
                    {mongoDetails &&
                        mongoDetails.comments &&
                        omdbDetails &&
                        omdbDetails.Title &&
                        <ReviewPane
                            pane_title={"CinemaHub Reviews"}
                            reviews={mongoDetails.comments}
                            movie_title={omdbDetails.Title}
                        />}
                </div>
            </div>
        </div>
    );
}

export default Details;