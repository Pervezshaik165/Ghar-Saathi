import React from "react";
import companyLogo from "../../assets/company_logo.png";

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center">
        <a href="#" className="flex items-center gap-3">
          <img src={companyLogo} alt="Gharsaathi" className="h-12 w-auto" />
          <span className="sr-only">Gharsaathi Domestic Service</span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
