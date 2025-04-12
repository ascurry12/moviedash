import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BEARER_TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN;

const MovieDetail = () => {
  let params = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      const url = `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      };

      const response = await fetch(url, options);

      const json = await response.json();
      json ? setMovie(json) : null;
    };

    fetchMovieData().catch(console.error);
  }, []);
  console.log(movie ? movie : null);
  return (
    <div>
      {movie ? (
        <div className="movie-details">
          <h2>
            {movie.title} ({movie.release_date.split("-")[0]})
          </h2>
          <h3>
            {movie.genres[0].name}
            {movie.genres[1] ? `/${movie.genres[1].name}` : null} ‧{" "}
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
          </h3>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          ></img>
          <div className="movie-info">
            <div style={{ display: "flex" }}>
              <h4>Summary</h4>
              {movie.imdb_id ? (
                <li className="imdb-link">
                  <Link
                    style={{ color: "Black", padding: 0 }}
                    to={`https://imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                  >
                    <h4>IMDb</h4>
                  </Link>
                </li>
              ) : null}
            </div>
            <p>{movie.overview}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieDetail;
