import React from 'react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800 px-4 text-center">
      <h1 className="text-6xl font-extrabold mb-6">Oops! Something Went Wrong</h1>
      <p className="text-lg max-w-md mb-6">
        The page you are searching for seems to have wandered into the unknown. <br />
        Please try refreshing, or return to the{' '}
        <a href="/" className="text-blue-600 hover:underline font-semibold">
          homepage
        </a>.
      </p>
    </div>
  );
};

export default ErrorPage;
