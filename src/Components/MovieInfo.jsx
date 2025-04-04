import React from "react";

const MovieInfo = ({ title, year, rating, language }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{year}</td>
      <td>{rating}</td>
      <td>{language}</td>
    </tr>
  );
};

export default MovieInfo;
