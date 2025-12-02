import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="#0F172A"/>
    <path d="M16 4L28 16L16 28L4 16L16 4Z" fill="#F8FAFC"/>
    <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="#0F172A"/>
  </svg>
);

const HamburgerIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
);

const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-surface-raised shadow-mechanical sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link to="/">
              <Logo />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/marketplace" className="text-primary hover:text-action">Marketplace</Link>
          <Link to="/seeker-dashboard" className="text-primary hover:text-action">Seeker Dashboard</Link>
          <Link to="/solver-hub" className="text-primary hover:text-action">Solver Hub</Link>
        </div>

        <div className="hidden md:block">
            <Link to="/login">
              <button className="bg-action text-white px-4 py-2 rounded-md shadow-mechanical hover:shadow-levitated transition-shadow">Login</button>
            </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-primary">
            {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-raised shadow-mechanical h-screen fixed top-20 left-0 w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center justify-center h-full -mt-20">
            <Link to="/marketplace" className="text-primary block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>Marketplace</Link>
            <Link to="/seeker-dashboard" className="text-primary block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>Seeker Dashboard</Link>
            <Link to="/solver-hub" className="text-primary block px-3 py-2 rounded-md text-base font-medium" onClick={toggleMobileMenu}>Solver Hub</Link>
            <Link to="/login" className="mt-4 w-full flex justify-center" onClick={toggleMobileMenu}>
              <button className="w-full bg-action text-white mt-4 px-4 py-2 rounded-md shadow-mechanical hover:shadow-levitated transition-shadow">Login</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
