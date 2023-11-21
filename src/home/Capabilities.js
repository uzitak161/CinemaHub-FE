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
        <div className={"d-flex flex-row w-100"}>
            <h3 className={"pe-2"}>CinemaHub Enables You...</h3>
            {capabilities.map((capability, index) => (
                <div style={{maxWidth: 300}} key={index} className={"d-flex flex-row rounded align-items-center p-3 text-white bg-secondary m-1 pt-0 pb-0"}>
                    <div className={"m-2"}>{capability.icon}</div>
                    <div className={"ms-2"}>{capability.description}</div>
                </div>
            ))}
        </div>
    );
}

export default Capabilities;