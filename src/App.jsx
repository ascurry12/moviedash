import { useState, useEffect } from "react";
import "./App.css";
import MovieInfo from "./Components/MovieInfo";
import Filters from "./Components/Filters";
import Statistics from "./Components/Statistics";
import DashboardPie from "./Components/DashboardPie";
import DashboardBar from "./Components/DashboardBar";

const BEARER_TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN;

function App() {
  const [movies, setMovies] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [page, setPage] = useState(1);
  const [genreData, setGenres] = useState(null);
  const [languageData, setLanguageData] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      const url = "https://api.themoviedb.org/3/discover/movie";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      };

      const response = await fetch(url, options);

      const json = await response.json();
      json ? setMovies(json) : null;
    };

    const fetchLanguages = async () => {
      const url = "https://api.themoviedb.org/3/configuration/languages";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      };

      const response = await fetch(url, options);

      const json = await response.json();
      json ? setLanguageData(json) : null;
    };

    const fetchGenres = async () => {
      const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      };

      const response = await fetch(url, options);

      const json = await response.json();
      json ? setGenres(json) : null;
    };

    fetchMovieData().catch(console.error);

    fetchLanguages().catch(console.error);
    fetchGenres().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      };

      const response = await fetch(url, options);

      const json = await response.json();
      if (page == 1) {
        json.results ? setNowPlaying(json.results) : null;
      } else {
        json.results ? setNowPlaying([...nowPlaying, ...json.results]) : null;
      }

      if (page < 4) setPage((prevPage) => prevPage + 1);
    };

    fetchChartData().catch(console.error);
  }, [page]);

  var languages = {};

  languageData
    ? languageData &&
      Object.entries(languageData).map(([_, language]) => {
        languages[language.iso_639_1] = language.english_name;
      })
    : null;

  var genres = {};

  genreData
    ? genreData &&
      Object.entries(genreData.genres).map(([_, genre]) => {
        genres[genre.id] = genre.name;
      })
    : null;

  // find average rating for now playing & find count of each genre in now playing

  var avgNowPlayingRating = 0;
  var countedData = {}

  nowPlaying
    ? nowPlaying &&
      Object.entries(nowPlaying).map(([_, playing]) => {
        avgNowPlayingRating += playing.vote_average;
        if (playing.genre_ids[0]) {
          genres[playing.genre_ids[0]] in countedData ? countedData[genres[playing.genre_ids[0]]] += 1 : countedData[genres[playing.genre_ids[0]]] = 1;
        }
      })
    : null;

  nowPlaying ? avgNowPlayingRating = (avgNowPlayingRating / nowPlaying.length) * 10 : null;

  var barData = []

  countedData
  ? countedData &&
    Object.entries(countedData).map(([data]) => {
      barData.push({name: data, count: countedData[data]})
    })
  : null;

  console.log(barData)

  return (
    <div className="main-app">
      <div>
        <h1>Movie Dash</h1>
        <Statistics movies={movies} filtered={filtered} />
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
                      id={movie.id}
                      key={movie.title}
                      title={movie.title}
                      year={year}
                      rating={Number(
                        Math.round(movie.vote_average * 100) / 100
                      )}
                      language={languages[movie.original_language]}
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
                      rating={Number(
                        Math.round(movie.vote_average * 100) / 100
                      )}
                      language={languages[movie.original_language]}
                    />
                  );
                })}
          </tbody>
        </table>
      </div>
      <div className="charts">
        <div className="chart">
          <DashboardPie
            value={Math.round(avgNowPlayingRating * 100) / 100}
            label={`Avg. Rating for ${nowPlaying ? nowPlaying.length : 0} Movies Now Playing`}
          ></DashboardPie>
        </div>
        <div className="chart">
          <DashboardBar dataProp={barData}/>
        </div>
      </div>
    </div>
  );
}

export default App;
