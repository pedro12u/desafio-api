import React from "react";
import Header from "./Header";
import MobileNav from "./MobileNav";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-600 shadow-md">
          <Header />
          <MobileNav />
        </div>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {title && (
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {title}
              </h1>
            </div>
          )}
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Banco Toscano - Pedro Toscano.
              Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
