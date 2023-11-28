import "./styles.css";
import Capabilities from "./Capabilities";
import ImageThumbnailPane from "./ImageThumbnailPane";
import img_title_id from "./TestImages/TestMovieData.js";
import {Link} from "react-router-dom";
import ReviewThumbnailPane from "./ReviewThumbnailPane";
import * as client from "../MongoDBClients/Comments/client.js";
import * as movieclient from "../MongoDBClients/Movies/client.js";
import * as omdbClient from "../OMDbAPI/client.js";
import {useEffect, useState} from "react";

function Home() {
    // TODO can be removed once login is implemented and flipped to false for testing
    const loggedIn = true;
    const username = "John Doe";
    const following = ["user5", "user4", "user2"];

    const [recentReviews, setRecentReviews] = useState([]);
    const fetchRecentReviews = async () => {
        let reviews = await client.findAllComments();
        reviews = reviews.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setRecentReviews(reviews);
    }

    const [recentFollowerReviews, setRecentFollowerReviews] = useState([]);
    const fetchRecentFollowerReviews = async () => {
        let reviews = await client.findAllComments();
        reviews = reviews.filter(review => following.includes(review.username));
        reviews = reviews.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        reviews = reviews.slice(0, 5);
        setRecentFollowerReviews(reviews);
    }

    const [followerHighRatings, setFollowerHighRatings] = useState([]);
    const fetchFollowerHighRatings = async () => {
        let reviews = await client.findAllComments();
        reviews = reviews.filter(review => following.includes(review.username));
        reviews = reviews.sort((a, b) => {
            return b.rating > a.rating;
        });

        const id_and_images = [];
        for (const review of reviews) {
            const movieObj = await omdbClient.findMovieById(review.movieId.omdbMovieId);
            const id_and_image = {};
            console.log("Movie obj " + JSON.stringify(movieObj));
            id_and_image["_id"] = movieObj.imdbID;
            id_and_image["img"] = movieObj.Poster;
            id_and_images.push(id_and_image);
        }
        console.log(id_and_images)
        setFollowerHighRatings(id_and_images);
    }

    const [highRatings, setHighRatings] = useState([]);
    const fetchHighRatings = async () => {
        let reviews = await movieclient.findAllMovies();
        reviews = reviews.sort((a, b) => {
            return b.rating - a.rating;
        });

        let id_and_images = [];
        for (const review of reviews) {
            const movieObj = await omdbClient.findMovieById(review.omdbMovieId);
            const id_and_image = {};
            console.log("Movie obj " + JSON.stringify(movieObj));
            id_and_image["_id"] = movieObj.imdbID;
            id_and_image["img"] = movieObj.Poster;
            id_and_images.push(id_and_image);
        }
        console.log(id_and_images)
        id_and_images = id_and_images.splice(0, 20)
        setHighRatings(id_and_images);
    }

    let panes_to_title = [
        {
            "loggedInSensitive": true,
            "thumbnailType": "movie",
            "img_title_id": followerHighRatings,
            "pane_title": "Movies Your Friends's Rated Highly"
        },
        {
            "loggedInSensitive": true,
            "thumbnailType": "review",
            "img_title_id": recentFollowerReviews,
            "pane_title": "Recent Reviews From Your Friends"
        },
        {
            "loggedInSensitive": false,
            "thumbnailType": "movie",
            "img_title_id": highRatings,
            "pane_title": "Top Rated Reviewed Movies"
        },
        {
            "loggedInSensitive": false,
            "thumbnailType": "review",
            "img_title_id": recentReviews,
            "pane_title": "Recent Reviews on CinemaHub"
        },
    ]
    panes_to_title = panes_to_title.filter(pane => !pane.loggedInSensitive || pane.loggedInSensitive === loggedIn);

    useEffect(() => {
        if (loggedIn) {
            fetchRecentFollowerReviews();
            fetchFollowerHighRatings();
        }
        fetchRecentReviews();
        fetchHighRatings();
    }, []);

    return (
        <div>
            <div className={"wd-image-title-text ps-2 pe-2 bg-dark"}>
                <span className={"text-white"}>Cinema</span>
                <span className={"text-black bg-info rounded"}>Hub</span>
            </div>
            <div className={"wd-image-sub-text ps-2 pe-2 mt-0 bg-dark"}>
                Like movies, leave reviews, and follow your friends
            </div>
            <div className={"w-100 overflow-hidden"}>
                <img src={require("./landing_page_full.png")} style={{height: 600}} alt={"Home Page"}/>
            </div>
            <div className={"me-5 ms-5"}>
                <div className={"w-100 text-center pt-3"}>
                    {loggedIn ?
                        <h1>Welcome back {username}</h1> :
                        <div>
                            <h1>Looks Like Your New Here</h1>
                            <Link
                                to={"/login"}
                                className={"btn btn-lg btn-success m-3"}
                            >
                                Click here to login!
                            </Link>
                        </div>
                    }
                </div>
                <div className={"d-flex flex-column justify-content-center"}>
                    {!loggedIn && <Capabilities/>}
                    {panes_to_title.map((pane, index) => {
                        if (pane.thumbnailType === "movie") {
                            return (
                                <ImageThumbnailPane
                                    img_title_id={pane.img_title_id}
                                    pane_title={pane.pane_title}
                                />
                            )
                        } else if (pane.thumbnailType === "review") {
                            return (
                                <ReviewThumbnailPane
                                    review_likes_username={pane.img_title_id}
                                    pane_title={pane.pane_title}
                                />
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;