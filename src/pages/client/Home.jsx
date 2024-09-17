import React, { useEffect, useState } from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import banner1 from "../../clientassets/images/banner/banner-1.jpg";
import $ from "jquery";
import "slick-carousel"; // Importing the Slick Carousel plugin
import axios from "axios"; // Import Axios
import { Link } from "react-router-dom";
import API_BASE_URL from "../../components/apiConfig";
import Login from "../all/Login";
import Register from "../client/Register";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set background images
    $("[data-background]").each(function () {
      $(this).css({
        "background-image": "url(" + $(this).data("background") + ")",
      });
    });

    // Initialize Slick Slider with animations
    $(".hero-slider").not(".slick-initialized").slick({
      autoplay: true,
      autoplaySpeed: 7500,
      pauseOnFocus: false,
      pauseOnHover: false,
      infinite: true,
      arrows: true,
      fade: true,
      cssEase: "ease-in-out",
      prevArrow:
        '<button type="button" class="prevArrow"><i class="ti-angle-left"></i></button>',
      nextArrow:
        '<button type="button" class="nextArrow"><i class="ti-angle-right"></i></button>',
      dots: true,
    });

    // Fetch courses from API
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/elearn/courses/latest/`
        ); // Update this URL based on your API
        setCourses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Header />
      <Login />
      <Register />

      {/* <!-- hero slider --> */}
      <section
        className="hero-section overlay bg-cover"
        data-background={banner1}
      >
        <div className="container">
          <div className="hero-slider">
            {/* <!-- slider item --> */}
            {/* <!-- slider item --> */}
            <div className="hero-slider-item">
              <div className="row">
                <div className="col-md-8">
                  <h1
                    className="text-white"
                    data-animation-out="fadeOutRight"
                    data-delay-out="5"
                    data-duration-in=".3"
                    data-animation-in="fadeInLeft"
                    data-delay-in=".1"
                  >
                    Your bright future is our mission
                  </h1>
                  <p
                    className="text-muted mb-4"
                    data-animation-out="fadeOutRight"
                    data-delay-out="5"
                    data-duration-in=".3"
                    data-animation-in="fadeInLeft"
                    data-delay-in=".4"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exer
                  </p>
                  <Link to="/courses"
                    className="btn btn-primary"
                    data-animation-out="fadeOutRight"
                    data-delay-out="5"
                    data-duration-in=".3"
                    data-animation-in="fadeInLeft"
                    data-delay-in=".7"
                  >
                    Explore Courses now
                  </Link>
                </div>
              </div>
            </div>
            {/* <!-- slider item --> */}
            <div className="hero-slider-item">
              <div className="row">
                <div className="col-md-8">
                  <h1
                    className="text-white"
                    data-animation-out="fadeOutUp"
                    data-delay-out="5"
                    data-duration-in=".3"
                    data-animation-in="fadeInDown"
                    data-delay-in=".1"
                  >
                    Your bright future is our mission
                  </h1>
                  <p
                    className="text-muted mb-4"
                    data-animation-out="fadeOutUp"
                    data-delay-out="5"
                    data-duration-in=".3"
                    data-animation-in="fadeInDown"
                    data-delay-in=".4"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exer
                  </p>
                  <Link to="/courses"
                    className="btn btn-primary"
                    data-animation-out="fadeOutUp"
                    data-delay-out="5"
                    data-duration-in=".3"
                    data-animation-in="fadeInDown"
                    data-delay-in=".7"
                  >
                    Explore Courses now
                  </Link>
                </div>
              </div>
            </div>
            {/* ... existing slider items ... */}
          </div>
        </div>
      </section>
      {/* <!-- /hero slider --> */}

      {/* <!-- courses --> */}
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center section-title justify-content-between">
                <h2 className="mb-0 text-nowrap mr-3">Latest Courses</h2>
                <div className="border-top w-100 border-primary d-none d-sm-block"></div>
                <div>
                  <Link
                    to="/courses"
                    className="btn btn-sm btn-outline-primary ml-sm-3 d-none d-sm-block"
                  >
                    See all
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- course list --> */}
          <div className="row justify-content-center">
            {loading ? (
              <div className="col-12 text-center">
                <p>Loading...</p>
              </div>
            ) : error ? (
              <div className="col-12 text-center">
                <p>Error: {error}</p>
              </div>
            ) : (
              courses.map((course) => (
                <div className="col-lg-4 col-sm-6 mb-5" key={course.course_id}>
                  <div className="card p-0 border-primary rounded-0 hover-shadow">
                    <img
                      className="card-img-top rounded-0"
                      src={course.cover_image}
                      alt="course thumb"
                    />
                    <div className="card-body">
                      <ul className="list-inline mb-2">
                        <li className="list-inline-item">
                          <i className="ti-calendar mr-1 text-color"></i>
                          {new Date(course.date_posted).toLocaleDateString()}
                        </li>
                      </ul>
                      <Link to={`/coursedetail/${course.course_id}`}>
                        <h4 className="card-title">{course.title}</h4>
                      </Link>
                      <p className="card-text mb-4">{course.description}</p>
                      <Link
                        to={`/coursedetail/${course.course_id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* <!-- /course list --> */}
          {/* <!-- mobile see all button --> */}
          <div className="row">
            <div className="col-12 text-center">
              <a
                href="courses.html"
                className="btn btn-sm btn-outline-primary d-sm-none d-inline-block"
              >
                See all
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /courses --> */}

      <Footer />
    </>
  );
};

export default Home;
