import React from "react";
import { useState, useEffect } from "react";
import "../App.css";

const Statistics = ({ movies, filtered }) => {
    let totalMovies = 0;
    let voteAverage = 0;
    let maxRating = 0;

    if (filtered) {
        let sum = 0;
        let ratings = [];
        for (let i = 0; i < filtered.length; i++) {
            sum += filtered[i].vote_average;
            ratings.push(filtered[i].vote_average);
        }
        voteAverage = Number(Math.round((sum/filtered.length) * 100) / 100);
        totalMovies = filtered.length;
        maxRating = Number(Math.round(Math.max(...ratings) * 100) / 100);

    }
    else if (movies) {
        let sum = 0;
        let ratings = [];
        for (let i = 0; i < movies.length; i++) {
            sum += movies[i].vote_average;
            ratings.push(movies[i].vote_average);
        }
        voteAverage = Number(Math.round((sum/movies.length) * 100) / 100);
        totalMovies = movies.length;
        maxRating = Number(Math.round(Math.max(...ratings) * 100) / 100);

    
    }
  return (
    <div className="statistics">
      <div className="stat-item">
        <h4>Total Movies:</h4>
        <p>{totalMovies}</p>
      </div>
      <div className="stat-item">
        <h4>Average Rating:</h4>
        <p>{voteAverage ? voteAverage : 0}</p>
      </div>
      <div className="stat-item">
        <h4>Highest Rating</h4>
        <p>{maxRating && maxRating !== -Infinity && maxRating !== Infinity ? maxRating : 0}</p>
      </div>
    </div>
  );
};

export default Statistics;
