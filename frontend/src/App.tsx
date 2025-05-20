import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateAccount from "./pages/CreateAccount";
import Operations from "./pages/Operations";
import Statement from "./pages/Statement";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/criar-conta" element={<CreateAccount />} />
          <Route path="/operacoes" element={<Operations />} />
          <Route path="/extrato" element={<Statement />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
