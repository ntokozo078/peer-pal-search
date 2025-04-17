
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container py-8 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <img src="/dut-logo.png" alt="DUT Logo" className="h-10 mb-4" />
            <p className="max-w-xs mt-4 text-sm text-gray-600">
              Durban University of Technology Peer Tutoring Platform.
              Connect, learn, and grow together.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/search" className="text-sm text-gray-600 hover:text-primary">
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-gray-600 hover:text-primary">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:support@dut.ac.za" className="text-sm text-gray-600 hover:text-primary">
                  support@dut.ac.za
                </a>
              </li>
              <li>
                <a href="tel:+27312042000" className="text-sm text-gray-600 hover:text-primary">
                  +27 31 204 2000
                </a>
              </li>
              <li>
                <p className="text-sm text-gray-600">
                  DUT, Steve Biko Campus, Durban, 4001
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-xs text-center text-gray-600">
            &copy; {new Date().getFullYear()} Durban University of Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
