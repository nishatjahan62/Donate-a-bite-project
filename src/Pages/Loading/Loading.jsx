import React from "react";

const Loading = () => {
  return (
    <div className="text-center text-primary flex items-center justify-center">
      <span className="loading loading-ring sm:loading-2xl loading-xl"></span>
      <span className="loading loading-ring sm:loading-2xl loading-xl"></span>
      <span className="loading loading-ring sm:loading-2xl loading-xl"></span>
    </div>
  );
};

export default Loading;
