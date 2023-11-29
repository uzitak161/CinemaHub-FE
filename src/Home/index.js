import "./styles.css";
import Capabilities from "./Capabilities";
import ImageThumbnailPane from "./ImageThumbnailPane";
import {Link} from "react-router-dom";
import ReviewThumbnailPane from "./ReviewThumbnailPane";
import * as reviewClient from "../MongoDBClients/Reviews/client.js";
import * as omdbClient from "../OMDbAPI/client.js";
import {useEffect, useState} from "react";
import * as clientUser from "../MongoDBClients/Users/client";

function Home() {
    // TODO can be removed once Login is implemented and flipped to false for testing
    const [account, setAccount] = useState(null);
    const fetchAccount = async () => {
        const new_account = await clientUser.account();
        console.log("The account is " + JSON.stringify(new_account));
        console.log("My account is " + JSON.stringify(account));
        if (!account || (account.username && new_account.username !== account.username)) {
            console.log("Setting account")
            setAccount(new_account);
        }
    };

    const [recentReviews, setRecentReviews] = useState([]);
    const [recentFollowingReviews, setRecentFollowingReviews] = useState([]);
    const [followingHighRatings, setFollowingHighRatings] = useState([]);
    const [highRatings, setHighRatings] = useState([]);
    const fetchRecentReviews = async () => {
        const reviews = await fetchReviewData(false, false, false);
        setRecentReviews(reviews);
    };
    const fetchRecentFollowingReviews = async () => {
        if (account) {
            let reviews = await fetchReviewData(false, true, false);
            reviews = reviews.slice(0, 5);
            setRecentFollowingReviews(reviews);
        }
    };
    const fetchFollowingHighRatings = async () => {
        if (account) {
            const id_and_images = await fetchReviewData(true, true, true);
            setFollowingHighRatings(id_and_images);
        }
    };
    const fetchHighRatings = async () => {
        const id_and_images = await fetchReviewData(true, false, true);
        setHighRatings(id_and_images);
    };

    const fetchReviewData = async (removeDuplicatesByMovieId, onlyIncludeFollowing, getPoster) => {
        let reviews = await reviewClient.findAllReviews();
        reviews = reviews.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        if (removeDuplicatesByMovieId) {
            reviews = reviews.reduce((accumulator, current) => {
                if (!accumulator.find((item) => item.movieId === current.movieId)) {
                    accumulator.push(current);
                }
                return accumulator;
            }, []);
        }
        if (onlyIncludeFollowing && account && account.following) {
            reviews = reviews.filter((review) => account.following.includes(review.username));
        }

        if (getPoster) {
            let id_and_images = [];
            for (const review of reviews) {
                const movieObj = await omdbClient.findMovieById(review.movieId);
                const id_and_image = {};
                id_and_image["_id"] = review.movieId;
                id_and_image["img"] = movieObj.Poster;
                id_and_images.push(id_and_image);
            }
            id_and_images = id_and_images.splice(0, 20);
            return id_and_images;
        } else {
            return reviews;
        }
    }

    const panes_to_title = [
        {
            thumbnailType: "movie",
            content: followingHighRatings,
            pane_title: "Movies Your Friends's Rated Highly",
        },
        {
            thumbnailType: "review",
            content: recentFollowingReviews,
            pane_title: "Recent Reviews From Your Friends",
        },
        {
            thumbnailType: "movie",
            content: highRatings,
            pane_title: "Top Rated Reviewed Movies",
        },
        {
            thumbnailType: "review",
            content: recentReviews,
            pane_title: "Recent Reviews on CinemaHub",
        },
    ];

    useEffect(() => {
        fetchAccount();
        fetchHighRatings();
        fetchRecentReviews();
        fetchRecentFollowingReviews();
        fetchFollowingHighRatings();
    }, [account]);

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
                <img
                    src={require("./landing_page_full.png")}
                    style={{height: 600}}
                    alt={"Home Page"}
                />
            </div>
            <div className={"me-5 ms-5"}>
                <div className={"w-100 text-center pt-3"}>
                    {account ? (
                        <h1>Welcome back {account.username}</h1>
                    ) : (
                        <div>
                            <h1>Looks Like Your New Here</h1>
                            <Link to={"/Login"} className={"btn btn-lg btn-success m-3"}>
                                Click here to login!
                            </Link>
                        </div>
                    )}
                </div>
                <div className={"d-flex flex-column justify-content-center"}>
                    {account === null && <Capabilities/>}
                    {panes_to_title.map((pane, index) => {
                        if (pane.content.length !== 0 && pane.thumbnailType === "movie") {
                            return (
                                <ImageThumbnailPane
                                    img_title_id={pane.content}
                                    pane_title={pane.pane_title}
                                />
                            );
                        } else if (pane.content.length !== 0 && pane.thumbnailType === "review") {
                            return (
                                <ReviewThumbnailPane
                                    review_likes_username={pane.content}
                                    pane_title={pane.pane_title}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
