"use client"

import React, { createContext, useContext } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastContextProps {
    showToast: (message: string, options?: ToastOptions) => void;
    showSuccessToast: (message: string, options?: ToastOptions) => void;
    showErrorToast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const showToast = (message: string, options?: ToastOptions) => {
        toast(message, options);
    };

    const showSuccessToast = (message: string, options?: ToastOptions) => {
        toast.success(message, options);
    };

    const showErrorToast = (message: string, options?: ToastOptions) => {
        toast.error(message, options);
    };

    return (
        <ToastContext.Provider value={{ showToast, showSuccessToast, showErrorToast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};