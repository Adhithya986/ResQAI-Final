import { useEffect, useState } from "react";

function WeatherCard({ latitude, longitude }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,cloud_cover,precipitation&timezone=auto`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data.current))
      .catch(console.error);

  }, [latitude, longitude]);

  // Weather Icon
  const getWeatherIcon = (code) => {
    if (code === 0) return "☀";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫";
    if (code <= 67) return "🌧";
    if (code <= 77) return "❄";
    if (code <= 82) return "🌦";
    if (code <= 99) return "⛈";
    return "🌍";
  };

  // Weather Risk
  const getRisk = () => {
    if (!weather) return "";

    if (weather.wind_speed_10m > 60)
      return "🔴 Extreme winds. Rescue operations are dangerous.";

    if (weather.temperature_2m > 40)
      return "🟠 Extreme heat. Heatstroke risk for rescue teams.";

    if (weather.relative_humidity_2m > 90)
      return "🟡 High humidity. Flood conditions may worsen.";

    return "🟢 Weather conditions are currently stable.";
  };

  if (!weather) {
    return (
      <div className="alert alert-info mt-3">
        Loading weather...
      </div>
    );
  }

  return (
    <div className="card mt-3 shadow-sm border-0">
      <div className="card-body">

        <h5>
          {getWeatherIcon(weather.weather_code)} Live Weather
        </h5>

        <hr />

        <p>
          🌡 Temperature:
          <strong> {weather.temperature_2m}°C</strong>
        </p>

        <p>
          💧 Humidity:
          <strong> {weather.relative_humidity_2m}%</strong>
        </p>

        <p>
          💨 Wind Speed:
          <strong> {weather.wind_speed_10m} km/h</strong>
        </p>

        <hr />

        <div
          className="alert alert-warning mb-0"
          style={{ fontWeight: "bold" }}
        >
          {getRisk()}
        </div>

      </div>
    </div>
  );
}

export default WeatherCard;