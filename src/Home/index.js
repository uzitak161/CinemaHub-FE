import "./styles.css";
import Capabilities from "./Capabilities";
import ImageThumbnailPane from "./ImageThumbnailPane";
import { Link } from "react-router-dom";
import ReviewThumbnailPane from "./ReviewThumbnailPane";
import * as reviewClient from "../MongoDBClients/reviewsClient.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RootComponent from "../rootComponent";

function Home() {
  const { currentUser } = useSelector((state) => state.user);

  const [recentReviews, setRecentReviews] = useState([]);
  const [recentFollowingReviews, setRecentFollowingReviews] = useState([]);
  const [followingHighRatings, setFollowingHighRatings] = useState([]);
  const [highRatings, setHighRatings] = useState([]);
  const fetchRecentReviews = async () => {
    const reviews = await fetchReviewData(
        false,
        false,
        false,
        true,
        false,
    );
    setRecentReviews(reviews);
  };
  const fetchRecentFollowingReviews = async () => {
    if (currentUser) {
      let reviews = await fetchReviewData(
        false,
        true,
        false,
        true,
        false,
      );
      reviews = reviews.slice(0, 5);
      setRecentFollowingReviews(reviews);
    }
  };
  const fetchFollowingHighRatings = async () => {
    if (currentUser) {
      const id_and_images = await fetchReviewData(
        true,
        true,
        true,
        false,
        true,
      );
      setFollowingHighRatings(id_and_images);
    }
  };
  const fetchHighRatings = async () => {
    const id_and_images = await fetchReviewData(
        true,
        false,
        true,
        false,
        true,
    );
    setHighRatings(id_and_images);
  };

  const fetchReviewData = async (
    removeDuplicatesByMovieId,
    onlyIncludeFollowing,
    getPoster,
    sortByDate,
    sortByRating,
  ) => {
    let reviews = await reviewClient.findAllReviews();
    if (sortByDate) {
      reviews = reviews.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
    if (sortByRating) {
      reviews = reviews.sort((a, b) => {
        return b.starRating - a.starRating;
      });
    }
    if (removeDuplicatesByMovieId) {
      reviews = reviews.reduce((accumulator, current) => {
        if (!accumulator.find((item) => item.movieId === current.movieId)) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);
    }
    if (onlyIncludeFollowing && currentUser && currentUser.following) {
      reviews = reviews.filter((review) =>
        currentUser.following.includes(review.username),
      );
    }

    if (getPoster) {
      let movies = [];
      for (const review of reviews) {
        movies.push(review.movieId);
      }
      return movies;
    } else {
      return reviews;
    }
  };

  const panes_to_title = [
    {
      thumbnailType: "movie",
      content: followingHighRatings,
      pane_title: "Movies Your Friend's Rated Highly",
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
    fetchHighRatings();
    fetchRecentReviews();
    fetchRecentFollowingReviews();
    fetchFollowingHighRatings();
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
        <img
          src={require("./landing_page_full.png")}
          style={{ height: 600 }}
          alt={"Home Page"}
        />
      </div>
      <div className={"me-5 ms-5"}>
        <div className={"w-100 text-center pt-3"}>
          {currentUser ? (
            <h1>Welcome back {currentUser.username}</h1>
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
          {currentUser === null && <Capabilities />}
          {panes_to_title.map((pane, index) => {
            if (pane.content.length !== 0 || currentUser) {
              if (pane.thumbnailType === "movie") {
                return (
                  <ImageThumbnailPane
                    pane_title={pane.pane_title}
                    movies={pane.content}
                  />
                );
              } else if (pane.thumbnailType === "review") {
                return (
                  <ReviewThumbnailPane
                    pane_title={pane.pane_title}
                    reviews={pane.content}
                  />
                );
              }
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
