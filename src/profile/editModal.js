import { useState, useEffect } from "react";
import { setCurrentUser } from "../Login/reducer";
import * as userClient from "../MongoDBClients/usersClient.js";
import { useDispatch } from "react-redux";

function EditModal({ setModal, account }) {
  const [formData, setFormData] = useState(account);

  const dispatch = useDispatch();

  useEffect(() => {}, []); // Empty dependency array ensures this effect runs only once on mount

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await userClient.updateUser(account.username, formData);
    console.log(response)
    if (response) {
      dispatch(setCurrentUser(response));
    }
    setModal(false);
    
  };

  function mouseoverPass() {
    let obj = document.getElementById('myPassword');
    obj.type = 'text';
  }
  function mouseoutPass() {
    let obj = document.getElementById('myPassword');
    obj.type = 'password';
  }

  return (
    <div className="container mt-5">
      <h1>Edit Profile</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            New Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="myPassword"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onPointerOver={mouseoverPass}
            onPointerOut={mouseoutPass}
          />
        </div>

        <div className="mb-3">
          <textarea
            name="bio"
            rows="4"
            className="form-control my-2"
            cols="50"
            placeholder="Enter your bio here..."
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="float-end mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
          <button
            type="submit"
            onClick={() => setModal(false)}
            className="btn btn-danger"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditModal;
