import React, { useEffect, useState } from "react";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import Login from "../all/Login";
import Register from "./Register";
import img from "../../clientassets/images/download.jpeg"
import { useAuth } from "../../components/context/AuthContext";
import API_BASE_URL from "../../components/apiConfig";
import axios from "axios";
import pageimg from "../../clientassets/images/backgrounds/page-title.jpg"
import $ from "jquery";




const Profile = () => {

  const [userData, setUserData] = useState(null);
  const { token } = useAuth(); // Access the token from the context

  useEffect(() => {
    // Set background images
    $("[data-background]").each(function () {
      $(this).css({
        "background-image": "url(" + $(this).data("background") + ")",
      });
    });
  }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      if (userData === null && token) { // Check if userData is null and token is available
        try {
          // Make an API request to fetch user data based on the logged-in user's role and identifier
          const response = await axios.get(`${API_BASE_URL}/user-detail/`, {
            headers: {
              Authorization: `Token ${token}`, // Include the token in the request headers
            },
          });
          setUserData(response.data); // Assuming response.data contains user data
      
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData(); // Call fetchUserData function
  }, [userData, token]); // Run the effect whenever userData or token changes

  // Check if userData is null before rendering
  if (userData === null) {
    return null; // or a loading indicator if desired
  }
  return (
    <>
    <Header/>
    <Login/>
    <Register/>

      {/* <!-- page title --> */}
      <section
        className="page-title-section overlay"
        data-background={pageimg}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <ul className="list-inline custom-breadcrumb mb-2">
                <li className="list-inline-item">
                  <a className="h2 text-primary font-secondary">
                    My profile
                  </a>
                </li>
                <li className="list-inline-item text-white h3 font-secondary nasted">
                {userData.first_name} {userData.last_name}
                </li>
              </ul>
              
             
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /page title --> */}

      {/* <!-- teacher details --> */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-5">
              <img
                className="img-fluid w-50"
                src={img}
                alt="teacher"
              />
            </div>
            <div className="col-md-4 mb-5">
              <h3>PERSONAL INFO</h3>
              
              <h5 className="text-color d-inline"><b>First name: </b></h5><span>{userData.first_name}</span><br/><br/>
              <h5 className="text-color d-inline"><b>Last name: </b></h5><span>{userData.last_name}</span><br/><br/>
              <h5 className="text-color d-inline"><b>Gender: </b></h5><span>{userData.gender}</span><br/><br/>
              

            
            </div>
            <div className="col-md-4 mb-5 mb-md-0">
                  <h3 className="mb-4">CONTACT INFO:</h3>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <a className="text-color" href="mailto:johndoe@email.com">
                        <i className="ti-email mr-2"></i>{userData.email}
                      </a>
                    </li>
                    <li className="mb-3">
                      <a className="text-color" href="tel:+120345876">
                        <i className="ti-mobile mr-2"></i>{userData.phone_no}
                      </a>
                    </li>
                    
                    
                    
                    <li className="mb-3">
                      <a className="text-color" href="teacher-single.html">
                        <i className="ti-world mr-2"></i>johnDoe.com
                      </a>
                    </li>
                   
                  </ul>
                </div>
         
          </div>
         
        </div>
      </section>
      {/* <!-- /teacher details --> */}
      <Footer/>
    </>
  );
};

export default Profile;
