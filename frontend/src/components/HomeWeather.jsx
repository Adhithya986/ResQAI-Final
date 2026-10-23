import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "0e9ab7820a52474577cc967aa1044fa8";

function HomeWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );

          const data = await res.json();

          console.log("Weather API Response:", data);

          if (!res.ok || data.cod !== 200) {
            setError(data.message || "Unable to fetch weather.");
            setLoading(false);
            return;
          }

          setWeather(data);
          setLoading(false);
        } catch (err) {
          console.error(err);
          setError("Something went wrong.");
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Location permission denied.");
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="card shadow p-4 mt-4">
        <h4>🌦 Loading Weather...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4">
        ❌ {error}
      </div>
    );
  }

  const condition = weather.weather[0].main;

let risk = "Low";
let tips = [];

switch (condition) {
  case "Thunderstorm":
    risk = "High";
    tips = [
      "Stay indoors.",
      "Avoid trees and electric poles.",
      "Keep your phone fully charged.",
      "Avoid flooded roads.",
    ];
    break;

  case "Rain":
    risk = "Medium";
    tips = [
      "Carry an umbrella or raincoat.",
      "Avoid low-lying areas.",
      "Watch for waterlogging.",
    ];
    break;

  case "Drizzle":
    risk = "Low";
    tips = [
      "Roads may be slippery.",
      "Drive carefully.",
    ];
    break;

  case "Clear":
    risk = "Low";
    tips = [
      "Weather is safe.",
      "Stay hydrated.",
      "Perfect time for outdoor activities.",
    ];
    break;

  case "Clouds":
    risk = "Low";
    tips = [
      "No immediate danger.",
      "Keep an eye on weather updates.",
    ];
    break;

  case "Mist":
  case "Fog":
      risk = "Medium";
      tips = [
        "Visibility is low.",
        "Drive slowly.",
        "Use headlights.",
      ];
      break;

  case "Smoke":
      risk = "High";
      tips = [
        "Wear a mask.",
        "Avoid outdoor exercise.",
      ];
      break;

  default:
      risk = "Low";
      tips = [
        "No special weather alerts.",
      ];
}
  
  return (
    <div className="card shadow-lg border-0 mt-4">
      <div className="card-body">
        <h3 className="text-primary">🌦 Live Weather</h3>

        <hr />

        <h4>📍 {weather.name}</h4>

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather"
        />

        <h2>{weather.main.temp}°C</h2>

        <p>
          <strong>Condition:</strong> {weather.weather[0].description}
        </p>

        <p>💧 Humidity: {weather.main.humidity}%</p>

        <p>🌬 Wind: {weather.wind.speed} m/s</p>

        <p>🌡 Feels Like: {weather.main.feels_like}°C</p>

        <hr />

<div
  className={`alert ${
    risk === "High"
      ? "alert-danger"
      : risk === "Medium"
      ? "alert-warning"
      : "alert-success"
  }`}
>
  <h4>🤖 AI Disaster Advisory</h4>

  <p>
    <strong>Risk Level:</strong> {risk}
  </p>

  <ul className="mb-0">
    {tips.map((tip, index) => (
      <li key={index}>{tip}</li>
    ))}
  </ul>
</div>
      </div>
    </div>
  );
}

export default HomeWeather;