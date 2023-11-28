import {FaFilm, FaSearch, FaStar, FaUser} from "react-icons/fa";

function Capabilities() {
    const capabilities = [
        {
            "description": "Keep track of films you've watched and liked", "icon": <FaFilm size={60}/>
        }, {
            "description": "Discover new films to watch", "icon": <FaSearch size={60}/>
        }, {
            "description": "Follow your friends' film tastes", "icon": <FaUser size={60}/>
        }, {
            "description": "Leave reviews on films you've watched", "icon": <FaStar size={60}/>
        }
    ]
    return (
        <div className={"d-flex flex-column"}>
            <h3 className={"pe-2"}>CinemaHub Enables You...</h3>
            <div className={"d-flex flex-row overflow-hidden"}>
                {capabilities.map((capability, index) => (
                    <div className={"d-flex flex-row rounded align-items-center p-3 text-white bg-secondary m-1 pt-0 pb-0"}>
                        <div className={"m-2"}>{capability.icon}</div>
                        <div className={"ms-2"}>{capability.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Capabilities;