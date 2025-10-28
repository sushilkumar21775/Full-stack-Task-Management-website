import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Toast Notification Component
 * 
 * Displays temporary notifications with auto-dismiss functionality
 * Supports success, error, warning, and info variants
 */

export const Toast = React.forwardRef(
  ({ className, variant = "default", onClose, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onClose?.();
        }, 300);
      }, 5000); // Auto-dismiss after 5 seconds

      return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    };

    const variantStyles = {
      default: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
      success: "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700 text-green-800 dark:text-green-100",
      error: "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700 text-red-800 dark:text-red-100",
      warning: "bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-100",
      info: "bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-100"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "fixed bottom-4 right-4 z-50 w-full max-w-sm pointer-events-auto",
          "shadow-lg rounded-lg border p-4",
          "transition-all duration-300 transform",
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1">{children}</div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }
);

Toast.displayName = "Toast";

export const ToastTitle = ({ className, children, ...props }) => {
  return (
    <div className={cn("font-semibold text-sm mb-1", className)} {...props}>
      {children}
    </div>
  );
};

export const ToastDescription = ({ className, children, ...props }) => {
  return (
    <div className={cn("text-sm opacity-90", className)} {...props}>
      {children}
    </div>
  );
};

// Toast Container for managing multiple toasts
export const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          onClose={() => onRemove(toast.id)}
        >
          {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
          {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
        </Toast>
      ))}
    </div>
  );
};
