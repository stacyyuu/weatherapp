import React, { useState } from "react";
import { getWeather } from "./api/getWeather";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    e.preventDefault();
    const data = await getWeather(query);
    setWeather(data);
    console.log(weather);
    setQuery("");
  };

  return (
    <div className="main-container">
      <form className="form-container" onSubmit={search}>
        <input
          type="text"
          className="search"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;F</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
