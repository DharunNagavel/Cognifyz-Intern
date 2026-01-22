import { useState, useEffect } from "react";
import { getWeather } from "./api";
import { Search, Thermometer, Cloud, Wind, Droplets, Navigation, MapPin, AlertCircle, RefreshCw } from "lucide-react";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentCities, setRecentCities] = useState(() => {
    // Load recent cities from localStorage
    const saved = localStorage.getItem("recentCities");
    return saved ? JSON.parse(saved) : [];
  });

  // Save recent cities to localStorage when they change
  useEffect(() => {
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
  }, [recentCities]);

  const fetchWeather = async (cityName = city) => {
    const cityToSearch = cityName.trim();
    if (!cityToSearch) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const res = await getWeather(cityToSearch);
      setWeather(res.data);
      
      // Add to recent cities
      setRecentCities(prev => {
        const filtered = prev.filter(c => c.toLowerCase() !== cityToSearch.toLowerCase());
        return [cityToSearch, ...filtered].slice(0, 5);
      });
      
      setCity("");
    } catch (err) {
      console.error("Weather API Error:", err);
      
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        // Token will be cleared by interceptor
        return;
      }
      
      if (err.response?.status === 400) {
        setError("City is required");
        return;
      }
      
      if (err.response?.status === 500) {
        setError("Weather service error. Please try another city.");
        return;
      }
      
      if (err.code === 'ERR_NETWORK') {
        setError("Cannot connect to server. Please check if backend is running.");
        return;
      }
      
      setError(err.response?.data?.message || "Failed to fetch weather data. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshWeather = async () => {
    if (weather) {
      await fetchWeather(weather.name);
    }
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      Clear: <Cloud className="w-16 h-16 text-yellow-500" />,
      Clouds: <Cloud className="w-16 h-16 text-gray-400" />,
      Rain: <Cloud className="w-16 h-16 text-blue-400" />,
      Drizzle: <Droplets className="w-16 h-16 text-cyan-400" />,
      Thunderstorm: <Cloud className="w-16 h-16 text-purple-400" />,
      Snow: <Cloud className="w-16 h-16 text-blue-200" />,
      Mist: <Cloud className="w-16 h-16 text-gray-300" />,
      Fog: <Cloud className="w-16 h-16 text-gray-300" />,
    };
    return icons[condition] || <Cloud className="w-16 h-16 text-gray-400" />;
  };

  const getBackgroundColor = () => {
    if (!weather) return "from-blue-500 to-cyan-500";
    
    const temp = weather.main.temp;
    if (temp < 0) return "from-blue-300 to-blue-600"; // Cold
    if (temp < 10) return "from-blue-400 to-cyan-400"; // Cool
    if (temp < 20) return "from-cyan-400 to-green-400"; // Mild
    if (temp < 30) return "from-yellow-400 to-orange-400"; // Warm
    return "from-orange-500 to-red-500"; // Hot
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Section */}
      <div className="mb-10">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a city (e.g., London, New York, Tokyo)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
            className="w-full pl-12 pr-32 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 shadow-sm"
            disabled={loading}
          />
          <button
            onClick={() => fetchWeather()}
            disabled={loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {/* Recent Cities */}
        {recentCities.length > 0 && (
          <div className="mt-6">
            <p className="text-gray-600 text-sm mb-3">Recent Searches:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {recentCities.map((recentCity, index) => (
                <button
                  key={index}
                  onClick={() => fetchWeather(recentCity)}
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 border border-blue-100 disabled:opacity-50"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{recentCity}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-700 font-medium">{error}</p>
              {error.includes("backend") && (
                <p className="text-red-600 text-sm mt-1">
                  Make sure your backend server is running on localhost:5000
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Weather Display */}
      {weather && (
        <div className={`bg-gradient-to-br ${getBackgroundColor()} rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl`}>
          {/* Header with refresh button */}
          <div className="flex justify-between items-start p-6">
            <div></div>
            <button
              onClick={refreshWeather}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Main Weather Card */}
          <div className="p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                  <MapPin className="w-6 h-6" />
                  <div>
                    <h2 className="text-4xl font-bold">{weather.name}</h2>
                    {weather.sys?.country && (
                      <p className="text-lg opacity-90">{weather.sys.country}</p>
                    )}
                  </div>
                </div>
                <p className="text-xl opacity-90 capitalize">
                  {weather.weather[0].description}
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  {getWeatherIcon(weather.weather[0].main)}
                </div>
                <div className="text-right">
                  <div className="text-6xl font-bold">
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <p className="opacity-90">
                    Feels like {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>
              </div>
            </div>

            {/* Weather Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/20">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Thermometer className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm opacity-80">Temperature</p>
                <p className="text-xl font-semibold">{Math.round(weather.main.temp)}°C</p>
                <p className="text-sm opacity-80">
                  Min: {Math.round(weather.main.temp_min)}°C / Max: {Math.round(weather.main.temp_max)}°C
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Droplets className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm opacity-80">Humidity</p>
                <p className="text-xl font-semibold">{weather.main.humidity}%</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Wind className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm opacity-80">Wind</p>
                <p className="text-xl font-semibold">{Math.round(weather.wind.speed)} km/h</p>
                {weather.wind.deg && (
                  <p className="text-xs opacity-70 mt-1">
                    Direction: {weather.wind.deg}°
                  </p>
                )}
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <Navigation className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm opacity-80">Pressure</p>
                <p className="text-xl font-semibold">{weather.main.pressure} hPa</p>
              </div>
            </div>

            {/* Additional Info */}
            {weather.sys && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm opacity-90">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span>Sunrise/Sunset</span>
                  <span className="font-semibold">
                    {weather.sys.sunrise && new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} / 
                    {weather.sys.sunset && new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span>Visibility</span>
                  <span className="font-semibold">
                    {weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : 'N/A'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!weather && !error && !loading && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6">
            <Cloud className="w-12 h-12 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">Welcome to WeatherSync</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Search for any city to see detailed weather information including temperature, humidity, wind speed, and more.
          </p>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl inline-block">
            <p className="text-blue-600 text-sm">
              <span className="font-semibold">Tip:</span> Try searching for "London", "Tokyo", or "New York"
            </p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6">
            <Cloud className="w-12 h-12 text-blue-400 animate-pulse" />
          </div>
          <p className="text-gray-500">Fetching weather data...</p>
          <p className="text-gray-400 text-sm mt-2">This may take a moment</p>
        </div>
      )}
    </div>
  );
}

export default Weather;