import React from "react";
import { Link } from "react-router-dom";
import "./Error404.css";

const Error404 = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Oops! Page not found</h2>
        <p className="error-description">
          The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="back-home">
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Error404;

