import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none"
        onClick={toggleMenu}
        aria-expanded={isOpen}
      >
        <span className="sr-only">Abrir menu principal</span>
        {isOpen ? (
          <X className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="block h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleMenu}
        >
          <div
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-medium text-gray-900">Menu</span>
              <button
                type="button"
                className="rounded-md p-2 text-gray-400 hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-4">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-100 hover:text-blue-700"
                  onClick={toggleMenu}
                >
                  Painel
                </Link>
                <Link
                  to="/criar-conta"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-100 hover:text-blue-700"
                  onClick={toggleMenu}
                >
                  Criar Conta
                </Link>
                <Link
                  to="/operacoes"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-100 hover:text-blue-700"
                  onClick={toggleMenu}
                >
                  Operações
                </Link>
                <Link
                  to="/extrato"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-blue-100 hover:text-blue-700"
                  onClick={toggleMenu}
                >
                  Extrato
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
