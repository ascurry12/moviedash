import { useState, useEffect } from "react";
import "./App.css";
import MovieInfo from "./Components/MovieInfo";
import Filters from "./Components/Filters";
import Statistics from "./Components/Statistics";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BEARER_TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN;
const languages = {
  en: "English",
  fr: "French",
  da: "Danish",
  ja: "Japanese",
  es: "Spanish",
  mn: "Mongolian",
  hi: "Hindi",
};

function App() {
  const [movies, setMovies] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovieData = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "Authorization": `Bearer ${BEARER_TOKEN}`,
        },
      };

      const response = await fetch(url, options);

      const json = await response.json();
      json ? setMovies(json) : null;
    };

    fetchMovieData().catch(console.error);
  }, [page]);

  return (
    <div className="main-app">
      <h1>Movie Dash</h1>
      <Statistics movies={movies} filtered={filtered}/>
      <Filters
        langs={languages}
        movies={movies}
        setFiltered={setFiltered}
        filtered={filtered}
      />
      <table className="data-list">
        <thead>
          <tr>
            <th>Title</th>
            <th>Release Year</th>
            <th>Average Rating</th>
            <th>Original Language</th>
          </tr>
        </thead>
        <tbody>
          {filtered
            ? filtered &&
              Object.entries(filtered).map(([_, movie]) => {
                const year = movie.release_date.split("-")[0];
                return (
                  <MovieInfo
                    key={movie.title}
                    title={movie.title}
                    year={year}
                    rating={movie.vote_average}
                    language={
                      languages[movie.original_language]
                    }
                  />
                );
              })
            : movies &&
              Object.entries(movies.results).map(([_, movie]) => {
                const year = movie.release_date.split("-")[0];
                return (
                  <MovieInfo
                    key={movie.title}
                    title={movie.title}
                    year={year}
                    rating={movie.vote_average}
                    language={
                      languages[movie.original_language]
                    }
                  />
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
