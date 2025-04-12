import React from "react";
import { Link } from "react-router-dom";

const MovieInfo = ({ id, title, year, rating, language }) => {
  return (
    <tr>
      <td>
        {" "}
        <Link
          style={{ color: "White" }}
          to={`/movie/${id}`}
          key={id}
        >
          {title}{" "}
        </Link>
      </td>
      <td>{year}</td>
      <td>{rating}</td>
      <td>{language}</td>
    </tr>
  );
};

export default MovieInfo;
