"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const modalVariants = cva(
  "fixed z-50 top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2  bg-white rounded-xl shadow-lg p-6",
  {
    variants: {
      size: {
        default: "max-w-md",
        lg: "max-w-2xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface ModalProps extends VariantProps<typeof modalVariants> {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

const Modal = ({
  open,
  onClose,
  title,
  children,
  size,
  className,
}: ModalProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            className={cn(modalVariants({ size }), className)}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {title}
              </h2>
            )}

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
