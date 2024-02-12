import React from "react";

const Spinner = () => {
  return (
    <div className="flex h-20 items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-8 border-gray-300 border-t-blue-600"></div>
    </div>
  );
};

export default Spinner;
