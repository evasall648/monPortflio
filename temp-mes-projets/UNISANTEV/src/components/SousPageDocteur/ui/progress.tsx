import React from "react";

interface ProgressProps {
  value: number;
}

const Progress: React.FC<ProgressProps> = ({ value }) => {
  return (
    <div className="relative w-full bg-gray-200 rounded">
      <div
        className="absolute top-0 left-0 h-full bg-blue-600 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;