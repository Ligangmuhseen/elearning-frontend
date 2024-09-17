import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/client/Header';
import Footer from '../../components/client/Footer';
import $ from 'jquery'
import titleimg from "../../clientassets/images/backgrounds/page-title.jpg"
import API_BASE_URL from '../../components/apiConfig';
import { Link } from 'react-router-dom';
import Login from '../all/Login';
import Register from './Register';



const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Set background images
    $("[data-background]").each(function () {
      $(this).css({
        "background-image": "url(" + $(this).data("background") + ")",
      });
    });
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/elearn/courses/`); // Replace with your API endpoint
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Register />
      <Login />

      <Header />
      {/* 
      <!-- page title --> */}
      <section
        className="page-title-section overlay"
        data-background={titleimg}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <ul className="list-inline custom-breadcrumb mb-2">
                <li className="list-inline-item">
                  <a className="h2 text-primary font-secondary" >
                    Home
                  </a>
                </li>
                <li className="list-inline-item text-white h3 font-secondary nasted">
                  Our Courses
                </li>
              </ul>
              <p className="text-lighten mb-0">
                Our courses offer a good compromise between the continuous
                assessment favoured by some universities and the emphasis placed
                on final exams by others.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /page title --> */}

      {/* <!-- courses --> */}
      <section className="section">
        <div className="container">
          {/* <!-- course list --> */}
          {courses.length > 0 ? (
            <div className="row justify-content-center">
              {courses.map((course) => (
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
                          <i className="ti-calendar mr-1 text-color"></i>{course.date_posted}
                        </li>
                        
                      </ul>
                      <Link to={`/coursedetail/${course.course_id}`}>
                        <h4 className="card-title">{course.title}</h4>
                      </Link>
                      <p className="card-text mb-4">
                        {course.description}
                      </p>
                      <Link
                        to={`/coursedetail/${course.course_id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="lead">No courses available at the moment.</p>
            </div>
          )}
          {/* <!-- /course list --> */}
        </div>
      </section>
      {/* <!-- /courses --> */}

      <Footer />
    </>
  );
};

export default Courses;
