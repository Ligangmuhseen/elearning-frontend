import React from "react";
import logo from "../../clientassets/images/logo.png";

const Footer = () => {
  return (
    <>
      {/* <!-- footer --> */}
      <footer>
        {/* <!-- footer content --> */}
        <div className="footer bg-footer section border-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-sm-8 mb-5 mb-lg-0">
                {/* <!-- logo --> */}
                <a className="logo-footer" href="index.html">
                  <img className="img-fluid mb-4" src={logo} alt="logo" />
                </a>
                <ul className="list-unstyled">
                  <li className="mb-2">Tanzania,Dar-es-salaam</li>
                  <li className="mb-2">+255 620147410</li>
                  <li className="mb-2">+255 774402817</li>
                  <li className="mb-2">triplerainbow07@gmail.com</li>
                </ul>
              </div>
              {/* <!-- company --> */}
              <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-5 mb-md-0">
                <h4 className="text-white mb-5">COMPANY</h4>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <a className="text-color" href="">
                      About Us
                    </a>
                  </li>
                  <li className="mb-3">
                    <a className="text-color" href="">
                      Our Teacher
                    </a>
                  </li>
                  <li className="mb-3">
                    <a className="text-color" href="">
                      Contact
                    </a>
                  </li>
                  <li className="mb-3">
                    <a className="text-color" href="">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- links --> */}
              <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-5 mb-md-0">
                <h4 className="text-white mb-5">LINKS</h4>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <a className="text-color" href="">
                      Courses
                    </a>
                  </li>
                  <li className="mb-3">
                    <a className="text-color" href="">
                      Events
                    </a>
                  </li>
                  <li className="mb-3">
                    <a className="text-color" href="">
                      Notice
                    </a>
                  </li>
                  <li className="mb-3">
                    <a className="text-color" href="">
                      Scholarship
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- support --> */}
              <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-5 mb-md-0">
                <h4 className="text-white mb-5">SUPPORT</h4>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <a className="text-color" href="">
                      Forums
                    </a>
                  </li>
                  <li className="mb-3">
                    <a className="text-color" href="">
                      Documentation
                    </a>
                  </li>
                  <li className="mb-3">
                    <a className="text-color" href="#!">
                      Language
                    </a>
                  </li>
                  <li className="mb-3">
                    <a className="text-color" href="#!">
                      Release Status
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- support --> */}
              <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-5 mb-md-0">
                <h4 className="text-white mb-5">RECOMMEND</h4>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <a className="text-color" href="">
                      WordPress
                    </a>
                  </li>
                  <li className="mb-3">
                    <a className="text-color" href="">
                      LearnPress
                    </a>
                  </li>
                  <li className="mb-3">
                    <a className="text-color" href="">
                      WooCommerce
                    </a>
                  </li>
                  <li className="mb-3">
                    <a className="text-color" href="">
                      bbPress
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- copyright --> */}
        <div className="copyright py-4 bg-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-7 text-sm-left text-center">
                <p className="mb-0">
                  Copyright &copy;{" "}
                  {new Date().getFullYear()}, designed & developed by{" "}
                  <a
                    href="https:myfolio.zabikha.ac.tz"
                    target="_blank"
                    className="text-muted"
                  >
                    Ligangmuhseen
                  </a>
                </p>
              </div>
              <div className="col-sm-5 text-sm-right text-center">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a className="d-inline-block p-2" href="">
                      <i className="ti-facebook text-primary"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="d-inline-block p-2" href="">
                      <i className="ti-twitter-alt text-primary"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="d-inline-block p-2" href="">
                      <i className="ti-github text-primary"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="d-inline-block p-2" href="">
                      <i className="ti-instagram text-primary"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- /footer --> */}
    </>
  );
};

export default Footer;
