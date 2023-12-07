import "./styles.css";
import * as reelsClient from "../MongoDBClients/reelsClient.js";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

function Reels({ movieId }) {
  const { currentUser } = useSelector((state) => state.user);
  const reels = currentUser.reels;
  const handleAddToReel = async (reel, btnId) => {
    const dbReal = await reelsClient.findReelById(reel._id);
    if (!dbReal.movies.includes(movieId)) {
      await reelsClient.addMovieToReel(reel._id, movieId);
    }
    document.getElementById(btnId).innerHTML = "";
  };
  return (
    <div className={"d-flex flex-column pt-5"}>
      <h3>Add to Your Reels</h3>
      <div className={"d-flex flex-row overflow-auto position-relative"}>
        {reels.map((reel, index) => (
          <div>
            <div
              className={
                "d-flex flex-row align-self-center rounded bg-dark text-white m-2 p-2 pe-4 ps-4 text"
              }
            >
              <div className={"align-self-center wd-font-size-large"}>
                {reel.title}
              </div>
              <div>
                <button
                  id={`${index}-details-reels-del`}
                  className={"wd-min-height-50 align-self-center btn"}
                  onClick={() =>
                    handleAddToReel(reel, `${index}-details-reels-del`)
                  }
                >
                  <FaCheckCircle size={40} color={"green"} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reels;
