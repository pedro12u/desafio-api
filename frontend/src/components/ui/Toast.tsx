import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const styles = {
    success: "border-l-4 border-emerald-500 bg-emerald-50",
    error: "border-l-4 border-red-500 bg-red-50",
    warning: "border-l-4 border-amber-500 bg-amber-50",
    info: "border-l-4 border-blue-500 bg-blue-50",
  };

  return (
    <div
      className={`
        ${styles[type]}
        fixed top-4 right-4 z-50 w-full max-w-md shadow-lg rounded-md p-4
        transform transition-transform duration-300 ease-in-out
        animate-enter
      `}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <button
          type="button"
          className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
