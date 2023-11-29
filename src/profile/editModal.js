import { useState, useEffect } from "react";

function EditModal({ setModal }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "USER",
  });

  useEffect(() => {
    // Fetch user data from your backend and populate the form fields
    // Example using fetch:
    fetch("/api/user-profile")
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          username: data.username,
          email: data.email,
          role: data.role,
        });
      })
      .catch((error) => console.error("Error:", error));
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the form data to your backend using fetch or another AJAX method
    // Example using fetch:
    fetch("/api/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
        // You can redirect the user or show a success message here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors, show error messages, etc.
      });
  };

  return (
    <div className="container mt-5">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
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
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <textarea
            rows="4"
            className="form-control my-2"
            cols="50"
            placeholder="Enter your bio here..."
          ></textarea>
        </div>

        <div className="float-end mt-3">
          <button type="submit" className="btn btn-primary">
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
