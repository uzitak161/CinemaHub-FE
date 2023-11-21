import "./styles.css";

function Home() {
    return (
        <div>
            <div className={"wd-image-container"}>
                <div className={"wd-image-title-text ps-2 pe-2"}>
                    CinemaHub
                </div>
                <div className={"wd-image-sub-text ps-2 pe-2"}>
                    Like movies, leave reviews, and follow your friends
                </div>
                <div className={"w-100"}>
                    <img src={require("./landing_page_full.png")} style={{height: 600}} alt={"Home Page"}/>
                </div>
            </div>
        </div>
    );
}

export default Home;