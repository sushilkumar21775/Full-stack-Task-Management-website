import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Welcome to <span className="text-blue-600 dark:text-blue-400">FullStack App</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            A modern full-stack application built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, and JWT authentication.
          </p>
          {!user ? (
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition duration-200"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-medium transition duration-200"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition duration-200"
            >
              Go to Dashboard
            </Link>
          )}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors">
            <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Fast & Modern</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built with Vite for lightning-fast development and optimal production builds.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors">
            <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Secure</h3>
            <p className="text-gray-600 dark:text-gray-300">
              JWT-based authentication with bcrypt password hashing for maximum security.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors">
            <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Beautiful UI</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Styled with Tailwind CSS for a responsive and modern user interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
