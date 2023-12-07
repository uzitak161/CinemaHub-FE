import { Link } from "react-router-dom";
import { FaUserAlt, FaUser, FaUserFriends, FaUserCheck } from "react-icons/fa";

const UserComponent = ({ user, currentUser }) => {
    return (
        <Link to={`/profile/${user.username}`} className="p-0 m-0 text-decoration-none ">
            <div key={user.username} className="wd-user-item">
                {user.profilePic ? (
                    <img src={user.profilePic} alt={`${user.username}'s profile`} className="wd-profile-pic" />
                ) : (
                    <FaUserAlt className="wd-avatar-pic" />
                )}
                <div className="wd-user-details">
                    {console.log(currentUser)}
                    <div className="wd-username">
                        {user.username}
                        {currentUser.following.includes(user.username) && <FaUserFriends className="wd-relation-icon" title="Following" />}
                        {currentUser.followers.includes(user.username) && <FaUserCheck className="wd-relation-icon" title="Follower" />}
                        {currentUser.username === user.username && <FaUser className="wd-relation-icon" title="You" />}
                    </div>
                    <div className="wd-role">{user.role}</div>
                    {user.role === 'USER' && (
                        <div className="wd-social-info">
                            <span>Following: {user.following.length}</span>
                            <span>Followers: {user.followers.length}</span>
                        </div>
                    )}
                    {/* Display reels if needed */}
                </div>
            </div>
        </Link>
    );
};

// Generate a user card within the search results (center column)
// function generateUserCard(user) {
//     return UserList(user);
// }

export default UserComponent;