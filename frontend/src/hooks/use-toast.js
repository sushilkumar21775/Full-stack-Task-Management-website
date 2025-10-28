import { useState, useCallback } from 'react';

/**
 * Toast Hook
 * 
 * Custom hook for managing toast notifications
 * 
 * Usage:
 * const { toasts, toast, removeToast } = useToast();
 * 
 * toast({
 *   title: "Success",
 *   description: "Task created successfully",
 *   variant: "success"
 * });
 */

let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default' }) => {
    const id = toastId++;
    const newToast = {
      id,
      title,
      description,
      variant
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, 5000);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  const success = useCallback(
    (title, description) => toast({ title, description, variant: 'success' }),
    [toast]
  );

  const error = useCallback(
    (title, description) => toast({ title, description, variant: 'error' }),
    [toast]
  );

  const warning = useCallback(
    (title, description) => toast({ title, description, variant: 'warning' }),
    [toast]
  );

  const info = useCallback(
    (title, description) => toast({ title, description, variant: 'info' }),
    [toast]
  );

  return {
    toasts,
    toast,
    removeToast,
    success,
    error,
    warning,
    info
  };
};
