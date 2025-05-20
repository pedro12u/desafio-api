import React from "react";
import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Wallet className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">
                Banco Toscano
              </span>
            </Link>
          </div>
          <nav className="hidden md:block">
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
              >
              </Link>
              <Link
                to="/criar-conta"
                className="text-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
              >
                Criar Conta
              </Link>
              <Link
                to="/operacoes"
                className="text-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
              >
                Operações
              </Link>
              <Link
                to="/extrato"
                className="text-white hover:bg-blue-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
              >
                Extrato
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
