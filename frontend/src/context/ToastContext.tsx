import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/ui/Toast";
import type { ToastType } from "../components/ui/Toast";

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextData {
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setMessages((state) => [...state, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-0 right-0 p-4 space-y-4 z-50">
        {messages.map((message) => (
          <Toast
            key={message.id}
            type={message.type}
            message={message.message}
            onClose={() => removeToast(message.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
