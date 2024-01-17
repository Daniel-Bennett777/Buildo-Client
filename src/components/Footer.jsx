import React from 'react';
import ".././Fonts/Fonts.css"
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="my-big-font text-center text-orange-500 bg-gradient-to-r from-gray-800 to-black">
      &copy; {currentYear} Buildos. All rights reserved.
    </footer>
  );
};
