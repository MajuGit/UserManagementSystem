import React from 'react';
import { Link } from 'react-router-dom';

const ForbiddenPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100">
            <span className="text-4xl">🚫</span>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Access Forbidden
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, you don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Go to Dashboard
          </Link>
          
          <div>
            <button
              onClick={() => window.history.back()}
              className="text-primary-600 hover:text-primary-500 text-sm font-medium"
            >
              ← Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
