import React, { useState } from "react";
import "./WeatherApp.css";

import searchIcon from "../Assets/search.png";
import ClearIcon from "../Assets/clear.png";
import CloudIcon from "../Assets/cloud.png";
import DrizzleIcon from "../Assets/drizzle.png";
import rainIcon from "../Assets/rain.png";
import snowicons from "../Assets/snow.png";
import Windicon from "../Assets/wind.png";
import HUmidityIcon from "../Assets/humidity.png";

export default function WeatherApp() {
  let api_key = "e4c84b6af8b92984ba85d23ddacf3e31";

  let [wicon, setwicon] = useState(CloudIcon);

  let search = async () => {
    let element = document.getElementsByClassName("cityInput");

    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    let humidity = document.getElementsByClassName("humidity-percent");
    let wind = document.getElementsByClassName("wind-rate");
    let temp = document.getElementsByClassName("weather-temp");
    let lucation = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " % ";
    wind[0].innerHTML = data.wind.speed + "Km/h";
    temp[0].innerHTML = data.main.temp + " °C";
    lucation[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setwicon(ClearIcon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setwicon(CloudIcon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setwicon(DrizzleIcon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setwicon(DrizzleIcon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setwicon(rainIcon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setwicon(rainIcon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setwicon(snowicons);
    } else {
      setwicon(ClearIcon);
    }
  };

  return (
    <div className="container">
      <div className="tob_bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={searchIcon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp"></div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={HUmidityIcon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={Windicon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
