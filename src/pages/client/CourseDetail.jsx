import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import Login from "../all/Login";
import Register from "../client/Register";
import API_BASE_URL from "../../components/apiConfig";
import { useAuth } from "../../components/context/AuthContext";
import "../../clientassets/toastr/toastr.min.css";
import titleimg from "../../clientassets/images/backgrounds/page-title.jpg"
import $ from "jquery";
import toastr from "toastr";


const CourseDetail = () => {
  const { course_id } = useParams(); // Get the course ID from the URL parameters
  const [course, setCourse] = useState(null); // State to store course details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // For navigation after enrollment
  const { token } = useAuth(); // Get token from AuthContext

  useEffect(() => {
    // Set background images
    $("[data-background]").each(function () {
      $(this).css({
        "background-image": "url(" + $(this).data("background") + ")",
      });
    });
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const config = {};
        // Add the token only if it exists (user is logged in)
        if (token) {
          config.headers = {
            Authorization: `Token ${token}`,
          };
        }

        const response = await axios.get(
          `${API_BASE_URL}/elearn/courses/${course_id}/`,
          config // Add config object to the request
        );
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError("Unable to fetch course details.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [course_id, token]); // Fetch the course whenever courseId or token changes

  const handleEnrollment = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/elearn/enroll/${course_id}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        toastr["success"](response.data.message);
        navigate("/courses"); // Redirect after successful enrollment
      } else {
        toastr["error"](response.data.message);
      }
    } catch (err) {
      console.error("Enrollment failed:", err);
      toastr["error"]("Enrollment failed. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Register />
      <Login />
      <Header />

      {/* <!-- page title --> */}
      <section
        className="page-title-section overlay"
        data-background={titleimg}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <ul className="list-inline custom-breadcrumb mb-2">
                <li className="list-inline-item">
                  <Link to="/courses" className="h2 text-primary font-secondary">
                    Our Courses
                  </Link>
                </li>
                <li className="list-inline-item text-white h3 font-secondary nasted">
                  {course.title}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /page title --> */}

      {/* <!-- section --> */}
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              {/* <!-- course thumb --> */}
              
                <img
                  src={course.cover_image}
                  alt={course.title}
                  style={{
                    width: "100%",
                    height: "500px",
                  }}
                  className="img-fluid w-100"
                />
            
            </div>
          </div>
          {/* <!-- course info --> */}
          <div className="row align-items-center mb-5">
            <div className="col-xl-3 order-1 col-sm-6 mb-4 mb-xl-0">
              <h4>{course.title}</h4>
            </div>
            <div className="col-xl-6 order-sm-3 order-xl-2 col-12 order-2">
              <ul className="list-inline text-xl-center"></ul>
            </div>

            <div className="col-xl-3 text-sm-right text-left order-sm-2 order-3 order-xl-3 col-sm-6 mb-4 mb-xl-0">
              {course.is_enroll ? (
                <h3 className="text-success">Enrolled</h3>
              ) : token ? (
                <button onClick={handleEnrollment} className="btn btn-primary">
                  Enroll now
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    toastr.error("To enroll you have to login first");
                  }}
                >
                  Enroll now
                </button>
              )}
            </div>
            {/* <!-- border --> */}
            <div className="col-12 mt-4 order-4">
              <div className="border-bottom border-primary"></div>
            </div>
          </div>
          {/* <!-- course details --> */}
          <div className="row">
            <div className="col-12 mb-4">
              <h3>About Course</h3>
              <p>{course.description}</p>
            </div>
            {course.is_enroll ? (
              <div className="col-12 mb-4">
                <Link to={`/chapters/${course.course_id}`}>View course chapters </Link>
              
                
                </div>
              
            ) : (
              <div className="col-12 mb-4">
                <h3 className="mb-3">To View Course Chapters, Enroll First</h3>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* <!-- /section --> */}

      <Footer />
    </>
  );
};

export default CourseDetail;
