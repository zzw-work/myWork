import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-2xl font-semibold">Page Not Found</p>
      <p className="text-gray-500 mt-2">
        The page you are looking for does not exist.
      </p>{" "}
      {/* Add any other elements you want to display */}
    </div>
  );
}
// This component can be used to display a 404 error page when a user tries to access a page that does not exist.
// It can be used in a React application by importing it and rendering it in the appropriate component.