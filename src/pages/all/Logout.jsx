import React from "react";
import { useAuth } from "../../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../components/apiConfig";
import axios from "axios";
import "../../clientassets/toastr/toastr.min.css"
import toastr from "toastr";

const Logout = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          // Call your logout API
          const response = await axios.post(`${API_BASE_URL}/logout/`, null, {});
          // console.log("Logout response:", response.data); // Log the response if needed
          toastr["success"](response.data.message);
          // alert(response.data.message);
        } catch (error) {
          // console.error("Error logging out:", error);
          toastr["error"]("error logout out");
        }
    
        // Delay before navigating to "/"
        setTimeout(() => {
          logout(); // Clear authentication token
          navigate("/");
        }, 1500); // 10 seconds delay
      };
  return (
    <>
      <li className="list-inline-item">
        <a
          className="text-uppercase text-color p-sm-2 py-2 px-0 d-inline-block"
          onClick={handleLogout}
        >
          LOGOUT
          <i
            style={{ fontSize: "10pt", fontWeight: "bolder" }}
            className="ti-arrow-right ml-1"
          ></i>
        </a>
      </li>
    </>
  );
};

export default Logout;
