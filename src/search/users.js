import { Link } from "react-router-dom";

const UserResults = ({ users }) => {
    return (
        <div>
            {users.map(user => (
                <div key={user._username}>
                    <Link to={`/profile/${user._username}`}>
                        <h3>{user._username}</h3>
                        <h3>{user.passwordHash}</h3>

                    </Link>
                    {/* Other user details */}
                </div>
            ))}
        </div>
    );
};

export default UserResults;