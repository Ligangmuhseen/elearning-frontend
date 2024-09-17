import React, { useState } from "react";
import axios from "axios";
// import $ from "jquery"; // Import jQuery for Bootstrap modal manipulation
import API_BASE_URL from "../../components/apiConfig";
import { useAuth } from "../../components/context/AuthContext";
import "../../clientassets/toastr/toastr.min.css";
import toastr from "toastr";

const Login = () => {
  // State for storing form data and API response
  const { setToken, setRole } = useAuth(); // Access setToken function from the context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, formData);
      if (response.status === 200) {
        const { role, token } = response.data; // Extract token from respon

        // Store token in context
        setToken(token);
        setRole(role);

      

        // Optionally reset the form fields
        setFormData({
          email: "",
          password: "",
        });

        // Redirect or perform any other action after login
        toastr["success"]("Login successful!");

        setTimeout(() => {
          window.location.reload()
          
        }, 3000);
      } else {
        toastr["error"]("Error: Unexpected response from server");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toastr["error"]("Invalid credentials");
      } else {
        toastr["error"]("Error logging in");
      }
    }
  };

  return (
    <>
    
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content rounded-0 border-0 p-4">
            <div className="modal-header border-0">
              <h3>Login</h3>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
            
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="row">
                <div className="col-12">
                  <input
                    type="email"
                    className="form-control mb-3"
                    id="loginEmail"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    type="password"
                    className="form-control mb-3"
                    id="loginPassword"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Login;
