import { FaCheckCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import * as usersClient from "../MongoDBClients/usersClient";
import * as reviewsClient from "../MongoDBClients/reviewsClient";
import { useSelector } from "react-redux";

function AdminUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    username: "",
    password: "",
    bio: "",
    role: "",
  });
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState();

  const fetchUsers = async () => {
    setUsers(await usersClient.findAllUsers());
  };

  const updateUser = async () => {
    if (username) {
      try {
        // update user
        if (
          currentUser.username !== username ||
          (currentUser.username === username && user.role === "ADMIN")
        ) {
          console.log(
            "updating user: " +
              username +
              " to " +
              user.role +
              " role" +
              " for current user: " +
              currentUser.username,
          );
          await usersClient.updateUser(username, user);
        } else {
          console.log("Cannot update your own role to USER");
        }
      } catch (e) {
        console.error(e);
      }
    }
    setUser({
      username: "",
      password: "",
      bio: "",
      role: "",
    });
    setUsername("");
  };
  const handleUserDelete = async (userName) => {
    // delete account
    if (currentUser.username !== userName) {
      try {
        console.log("deleting user: " + userName);
        await usersClient.deleteUser(userName);
        console.log("deleted user: " + userName);
      } catch (e) {
        console.error(e);
      }
    } else {
      console.log("Cannot delete your own account");
    }
    setUser({
      username: "",
      password: "",
      bio: "",
      role: "",
    });
    setUsername("");
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);
  return (
    <div>
      <div className={"bg-secondary text-white rounded p-2 me-2 ms-2"}>
        <div className={"d-flex flex-row justify-content-between"}>
          <div className={"ms-2"}></div>
          <h3>Edit a User</h3>
          <button className={"btn"} onClick={() => updateUser()}>
            <FaCheckCircle color={"green"} size={40} />
          </button>
        </div>
        <div className={"d-flex flex-row"}>
          <div className={"w-25 me-2"}>
            <label htmlFor={"username"}>Username</label>
            <input
              className="form-control"
              id={"username"}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              value={user.username}
            ></input>
            <label htmlFor={"password"}>Password</label>
            <input
              className="form-control"
              id={"password"}
              type={"password"}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
            ></input>

            <label htmlFor={"role"}>Role</label>
            <select
              value={user.role}
              className="form-select"
              id={"role"}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option defaultChecked selected>
                Select a user type
              </option>
              <option value={"USER"}>USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className={"flex-grow-1"}>
            <label htmlFor="bio">Bio</label>
            <textarea
              className="form-control"
              rows="6"
              for={"bio"}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              value={user.bio}
            ></textarea>
          </div>
        </div>
      </div>
      <div className={"d-flex flex-column"}>
        {users.map((usr, index) => (
          <div
            className={
              "rounded bg-dark text-decoration-none text-white m-2 p-2 pe-4 ps-4 d-flex flex-row"
            }
          >
            <div className={"d-flex flex-column"}>
              <div className={"text-nowrap wd-font-size-large"}>
                {usr.username}
              </div>
              <span className={"text-secondary"}>Password: {usr.password}</span>
              <span className={"text-secondary"}>Role: {usr.role}</span>
              <span className={"text-secondary"}>Bio: {usr.bio}</span>
            </div>
            <div className="flex-grow-1 text-end text-nowrap">
              <button
                className={"btn btn-light me-2"}
                onClick={() => {
                  setUser(usr);
                  setUsername(usr.username);
                }}
              >
                Edit
              </button>
              <button
                className={"btn btn-danger"}
                onClick={() => handleUserDelete(usr.username)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;
