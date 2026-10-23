import { useState } from "react";

function HomeWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY =
    import.meta.env.VITE_OPENWEATHER_API_KEY || "0e9ab7820a52474577cc967aa1044fa8";

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (data.cod !== 200) {
        alert("Location not found");
        return;
      }

      setWeather(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card shadow p-4 mt-5">

      <h3 className="mb-3">
        🌦 Live Weather
      </h3>

      <div className="input-group">

        <input
          className="form-control"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={getWeather}
        >
          Search
        </button>

      </div>

      {weather && (

        <div className="mt-4">

          <h4>{weather.name}</h4>

          <h5>{weather.main.temp} °C</h5>

          <p>☁ {weather.weather[0].main}</p>

          <p>💧 Humidity: {weather.main.humidity}%</p>

          <p>🌬 Wind: {weather.wind.speed} m/s</p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather"
          />

        </div>

      )}

    </div>
  );
}

export default HomeWeather;