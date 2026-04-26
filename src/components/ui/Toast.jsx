import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const TYPES = {
  success: { Icon: CheckCircle, cls: 'border-success/30 bg-success/5 text-success' },
  error:   { Icon: XCircle,     cls: 'border-danger/30 bg-danger/5 text-danger' },
  warning: { Icon: AlertCircle, cls: 'border-warning/30 bg-warning/5 text-warning' },
  info:    { Icon: Info,        cls: 'border-primary/30 bg-primary/5 text-primary' },
};

function ToastItem({ toast, onRemove }) {
  const { Icon, cls } = TYPES[toast.type] || TYPES.info;
  useEffect(() => {
    const t = setTimeout(() => onRemove(toast.id), toast.duration || 3500);
    return () => clearTimeout(t);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div className={`flex items-start gap-3 p-4 bg-card border rounded-xl shadow-lg min-w-[280px] max-w-sm animate-slide-right ${cls}`}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        {toast.title && <p className="font-semibold text-text text-sm">{toast.title}</p>}
        <p className="text-sm text-gray-600">{toast.message}</p>
      </div>
      <button onClick={() => onRemove(toast.id)} className="text-gray-400 hover:text-gray-600 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const remove = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);

  const addToast = useCallback((message, type = 'info', title, duration) => {
    setToasts(t => [...t, { id: Date.now(), message, type, title, duration }]);
  }, []);

  addToast.success = (msg, title) => addToast(msg, 'success', title);
  addToast.error   = (msg, title) => addToast(msg, 'error', title);
  addToast.warning = (msg, title) => addToast(msg, 'warning', title);
  addToast.info    = (msg, title) => addToast(msg, 'info', title);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
        {toasts.map(t => <ToastItem key={t.id} toast={t} onRemove={remove} />)}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() { return useContext(ToastContext); }
