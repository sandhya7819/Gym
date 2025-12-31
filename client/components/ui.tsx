import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={twMerge('bg-white border border-gray-200 rounded-lg shadow-sm p-6', className)}>
            {children}
        </div>
    );
};

export const Button = ({
    children,
    className,
    variant = 'primary',
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'danger' }) => {
    const baseStyles = 'px-4 py-2 rounded-md font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-green-500',
        outline: 'bg-transparent border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    return (
        <button className={twMerge(baseStyles, variants[variant], className)} {...props}>
            {children}
        </button>
    );
};
