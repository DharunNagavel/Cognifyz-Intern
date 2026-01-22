import { useState } from "react";
import { login, register } from "./api";
import { User, Lock, LogIn, UserPlus, AlertCircle } from "lucide-react";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e, isLogin = true) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let response;
      if (isLogin) {
        response = await login({ username, password });
      } else {
        response = await register({ username, password });
        if (response.status === 200) {
          setError("Registration successful! You can now login.");
          setIsRegistering(false);
          return;
        }
      }

      if (response.data.token) {
        setToken(response.data.token);
      }
    } catch (err) {
      console.error("API Error:", err);
      if (err.response) {
        // Server responded with error
        setError(err.response.data?.message || 
          (isLogin ? "Login failed. Please check your credentials." : "Registration failed. User might already exist."));
      } else if (err.request) {
        // Request was made but no response
        setError("Cannot connect to server. Please check if the backend is running.");
      } else {
        // Something else happened
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {isRegistering ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-gray-600">
          {isRegistering ? "Register to access weather data" : "Sign in to access weather data"}
        </p>
      </div>

      <form onSubmit={(e) => handleSubmit(e, !isRegistering)}>
        <div className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className={`p-4 rounded-xl flex items-start space-x-3 ${
              error.includes("successful") 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-4 pt-4">
            {isRegistering ? (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <UserPlus className="w-5 h-5" />
                  <span className="font-semibold">
                    {loading ? "Creating Account..." : "Register"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(false);
                    setError("");
                  }}
                  disabled={loading}
                  className="w-full px-6 py-3 text-blue-600 hover:text-blue-700 transition-colors duration-300 disabled:opacity-50"
                >
                  Already have an account? Sign in
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-semibold">
                    {loading ? "Signing in..." : "Login"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(true);
                    setError("");
                  }}
                  disabled={loading}
                  className="w-full px-6 py-3 text-blue-600 hover:text-blue-700 transition-colors duration-300 disabled:opacity-50"
                >
                  Don't have an account? Register
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;