import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/client/Header";
import Login from "../all/Login";
import Register from "./Register";
import Footer from "../../components/client/Footer";
import API_BASE_URL from "../../components/apiConfig";
import { useAuth } from "../../components/context/AuthContext";
import { Link } from "react-router-dom";
import titleimg from "../../clientassets/images/backgrounds/page-title.jpg"
import DataTable from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // DataTables CSS
import $ from "jquery";

const Enrollment = () => {
  const { token } = useAuth(); // Get token from AuthContext to authenticate user
  const [enrollments, setEnrollments] = useState([]); // State to store fetched enrollments
  const [totalEnrollments, setTotalEnrollments] = useState(0); // State for enrollment count
  const [loading, setLoading] = useState(true); // State to manage loading


  useEffect(() => {
    // Set background images
    $("[data-background]").each(function () {
      $(this).css({
        "background-image": "url(" + $(this).data("background") + ")",
      });
    });
  }, []);

  useEffect(() => {
    // Fetch enrollments when component loads
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/elearn/user/enrollments/`,
          {
            headers: {
              Authorization: `Token ${token}`, // Add Authorization header if token is available
            },
          }
        );

        setEnrollments(response.data.enrollments); // Set enrollments data
        setTotalEnrollments(response.data.count); // Set total count
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchEnrollments();
  }, [token]);

  useEffect(() => {
    if (!loading) {
      // Initialize DataTable only after data is loaded
      const myTable = new DataTable("#example", {
        perPage: 5,
        searchable: true,
        sortable: true,
        responsive: true,
        retrieve: true,
        perPageSelect: [5, 10, 15, 20],
      });
    }
  }, [loading]); // Re-run effect when loading is complete

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  return (
    <>
      <Header />
      <Login />
      <Register />

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
                  <a
                    className="h2 text-primary font-secondary"
                    href="/enrollments"
                  >
                    Enrollment
                  </a>
                </li>
                <li className="list-inline-item text-white h3 font-secondary nasted">
                  Enrollment History
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /page title --> */}

      {/* <!-- enrollment details --> */}
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex">
                <div className="text-center mr-4">
                  <div className="p-4 bg-primary text-white">
                    <span className="h3 d-block">{totalEnrollments}</span>
                  </div>
                </div>
                {/* <!-- enrollment content --> */}
                <div>
                  <h3 className="mt-4">My Total Enrollments</h3>
                </div>
              </div>
            </div>

            <div className="col-12">
              <h3 className="mt-4">All Enrollments</h3>
              <table id="example" className="display" style={{ width: "100%" }}>
                <thead style={{ backgroundColor: "#ffbc3b" }}>
                  <tr>
                    <th>S/N</th>
                    <th>Course Name</th>
                    <th>Date Enrolled</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment, index) => (
                    <tr key={enrollment.id}>
                      <td>{index + 1}</td>
                      <td>{enrollment.course_name}</td>
                      <td>{enrollment.enroll_date}</td>
                      <td>
                        <Link to={`/coursedetail/${enrollment.course}`}>
                          <button className="btn btn-sm btn-success btn-group-sm border-0">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /enrollment details --> */}

      <Footer />
    </>
  );
};

export default Enrollment;
