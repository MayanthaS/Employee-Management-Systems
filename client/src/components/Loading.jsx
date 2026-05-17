import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="animate-spin size-9 border-2 border-cyan-700 border-t-transparent rounded-full "></div>
    </div>
  );
};

export default Loading;
