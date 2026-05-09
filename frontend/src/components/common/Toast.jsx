import React, { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

export const useToast = () => {
  return useContext(ToastContext);
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ type = "success", title = "", message = "", duration = 4000 }) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <div
        aria-live="polite"
        className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-start sm:justify-end sm:p-6 pointer-events-none"
      >
        <div className="w-full flex flex-col gap-3 max-w-sm sm:items-end">
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <div
                role="status"
                className={`rounded-lg shadow-lg p-3 ${
                  t.type === "success"
                    ? "bg-green-50 text-green-900 border border-green-200"
                    : t.type === "error"
                    ? "bg-red-50 text-red-900 border border-red-200"
                    : "bg-white text-gray-900 border border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    {t.title && <div className="font-semibold">{t.title}</div>}
                    <div className="text-sm">{t.message}</div>
                  </div>
                  <button onClick={() => removeToast(t.id)} className="text-gray-500 ml-2">✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
