import React from "react";
import { useState, useEffect } from "react";

const Filters = ({ langs, movies, setFiltered, filtered }) => {
  const [language, setLanguage] = useState("none");
  const [year, setYear] = useState("none");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!movies) return;

    let updatedFiltered = movies.results;

    if (language !== "none") {
      updatedFiltered = updatedFiltered.filter(
        (movie) => movie.original_language == language
      );
    }

    if (year !== "none") {
      updatedFiltered = updatedFiltered.filter(
        (movie) => movie.release_date.split("-")[0] == year
      );
    }

    if (query !== null || query != "") {
      updatedFiltered = updatedFiltered.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFiltered(updatedFiltered);
  }, [query, language, year, movies]);

  const onFilter = () => {
    const searchBar = document.getElementById("search");
    const langFilter = document.getElementById("languages");
    const yearFilter = document.getElementById("years");

    setQuery(searchBar.value);
    setYear(yearFilter.value);
    setLanguage(langFilter.value);
  };

  return (
    <div className="filters">
      <div className="filter-item">
        <input
          id="search"
          type="search"
          placeholder="Search for a Title"
          onChange={onFilter}
        ></input>
      </div>
      <div className="filter-item">
        <select id="years" name="years" onChange={onFilter}>
          <option value="none">Select Year</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>
      <div className="filter-item">
        <select id="languages" name="languages" onChange={onFilter}>
          <option value="none">Select Language</option>
          {langs &&
            Object.entries(langs).map(([lang]) => {
              return (
                <option key={lang} value={lang}>
                  {langs[lang]}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default Filters;
