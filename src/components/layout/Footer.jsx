import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-1 text-white">Skill With People</h3>
            <p className="text-gray-300 text-sm">
              Belajar keterampilan interpersonal dan komunikasi efektif
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} Skill With People
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Berdasarkan buku "Skill With People" oleh Les Giblin
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;