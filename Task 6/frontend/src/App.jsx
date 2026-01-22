import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="py-6">
          <h1 className="text-3xl font-bold text-indigo-700 text-center">
            Auth Dashboard
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Secure authentication system
          </p>
        </header>
        
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-1 inline-flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                isLogin 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                !isLogin 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {isLogin ? <Login /> : <Register />}
            
            <div className="text-center mt-8">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                {isLogin 
                  ? "Don't have an account? Register here" 
                  : "Already have an account? Login here"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}