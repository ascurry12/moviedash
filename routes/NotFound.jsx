import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h3>There's nothing here!</h3>
            <Link style={{ color: "Black" }}
            to={`/`}>
            Back to Home
            </Link>
        </div>
    );
};

export default NotFound;