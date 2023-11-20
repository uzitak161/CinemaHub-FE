import { Link } from "react-router-dom";
import {useLocation } from "react-router-dom";

function NavBar() {

    const pathname = useLocation()
    if (pathname.pathname.includes("/login")) {
        return null;
    } else {

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                <a className="ms-2 navbar-brand" href="#">CinemaHub</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link key={"home"} to={`/home`} className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link key={"profile"} to={`/profile`} className={"nav-link"}>Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link key={"search"} to={`/search`} className="nav-link">Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link key={"login"} to={`/login`} className="nav-link">login</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;