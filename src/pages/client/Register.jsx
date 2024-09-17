import React, { useState } from "react";
import axios from "axios";
import "../../clientassets/toastr/toastr.min.css"
import API_BASE_URL from "../../components/apiConfig";
import toastr from "toastr";




const Register = () => {
  // State for storing form data and API response
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_no: "",
    email: "",
    password: "",
    gender: "",
    role: "client", // Fixed value for role
  });



  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    axios
      .post(`${API_BASE_URL}/register/`, formData) // Replace with your API URL
      .then((response) => {
        toastr['success']("User registered successfully");
           // Dismiss the modal after successful registration
           setTimeout(() => {
            window.location.reload()
            
          }, 3000);
       
      })
      .catch((err) => {
        toastr["error"]("Registration failed. Please try again.");
 
        console.error(err);
      });
  };

  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="signupModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content rounded-0 border-0 p-4">
            <div className="modal-header border-0">
              <h3>Register</h3>
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
              <div className="login">
             

                <form onSubmit={handleSubmit} className="row">
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="signupPhone"
                      name="phone_no"
                      placeholder="Phone"
                      value={formData.phone_no}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="signupFirstName"
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="signupLastName"
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control mb-3"
                      id="signupEmail"
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
                      id="signupPassword"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    {/* Gender select field */}
                    <select
                      className="form-control mb-3"
                      id="signupGender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                     
                    </select>
                  </div>

                  {/* Role is hidden but set as 'client' */}
                  <input
                    type="hidden"
                    name="role"
                    value="client"
                  />

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      SIGN UP
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
    </>
  );
};

export default Register;
