import { useState, useEffect } from "react";
import Login from "./Login";
import Weather from "./Weather";
import { Cloud, CloudRain, Sun, LogOut } from "lucide-react";

function App() {
  const [token, setToken] = useState(() => {
    // Check localStorage for existing token on initial load
    return localStorage.getItem("token") || null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  WeatherSync
                </h1>
                <p className="text-gray-600 text-sm mt-1">Real-time weather insights</p>
              </div>
            </div>
            
            {token && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </header>

          {/* Main Content */}
          <main className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-8 md:p-12">
              {!token ? (
                <Login setToken={setToken} />
              ) : (
                <Weather />
              )}
            </div>
          </main>

          {/* Footer */}
          <footer className="mt-12 text-center text-gray-500 text-sm">
            <p>© 2024 WeatherSync. Built with React & Tailwind CSS.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;