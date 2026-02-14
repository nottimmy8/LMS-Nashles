import { useState, useEffect } from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

// Simple event emitter for toasts
const toastArray: ToastProps[] = [];
const listeners: Array<(toasts: ToastProps[]) => void> = [];

const notifyListeners = () => {
  listeners.forEach((l) => l([...toastArray]));
};

export const toast = ({
  title,
  description,
  variant = "default",
}: ToastProps) => {
  const newToast = { title, description, variant };
  toastArray.push(newToast);
  notifyListeners();

  // Auto dismiss after 3 seconds for this simple mock
  setTimeout(() => {
    const index = toastArray.indexOf(newToast);
    if (index > -1) {
      toastArray.splice(index, 1);
      notifyListeners();
    }
  }, 3000);

  console.log(`Toast: ${title} - ${description} (${variant})`);
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    const listener = (newToasts: ToastProps[]) => {
      setToasts(newToasts);
    };
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    toast,
    toasts,
    dismiss: () => {},
  };
};
