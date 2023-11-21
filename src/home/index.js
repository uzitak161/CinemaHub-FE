import "./styles.css";
import Capabilities from "./Capabilities";
import ImageThumbnailPane from "./ImageThumbnailPane";
import img_title_id from "./TestImages/TestMovieData.js";
import {Link} from "react-router-dom";
import ReviewThumbnailPane from "./ReviewThumbnailPane";
import review_username_movie from "./TestImages/TestReviewData.js";

function Home() {
    console.log(review_username_movie);
    // TODO can be removed once login is implemented and flipped to false for testing
    const loggedIn = true;

    const username = "John Doe";
    const top_rated_thrillers = img_title_id;
    const followers_recent_likes = loggedIn ? img_title_id : [];
    let panes_to_title = [
        {
            "loggedInSensitive": true,
            "thumbnailType": "movie",
            "img_title_id": followers_recent_likes,
            "pane_title": "Your Follower's Recent Likes"
        },
        {
            "loggedInSensitive": true,
            "thumbnailType": "review",
            "img_title_id": review_username_movie,
            "pane_title": "Recent Reviews From Your Followers"
        },
        {
            "loggedInSensitive": false,
            "thumbnailType": "movie",
            "img_title_id": top_rated_thrillers,
            "pane_title": "Top Rated Thriller Movies"
        },
        {
            "loggedInSensitive": false,
            "thumbnailType": "review",
            "img_title_id": review_username_movie,
            "pane_title": "Recent Reviews on CinemaHub"
        },
    ]
    panes_to_title = panes_to_title.filter(pane => !pane.loggedInSensitive || pane.loggedInSensitive  === loggedIn);

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