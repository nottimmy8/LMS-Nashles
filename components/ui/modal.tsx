"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-black/90 rounded-xl shadow-xl w-full max-w-md p-6 pointer-events-auto relative mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {description && <p className="text-white mb-6">{description}</p>}

              <div>{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
