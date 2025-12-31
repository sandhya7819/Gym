'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Programs', href: '/programs' },
        { name: 'Contact', href: '/contact' },
        { name: 'Dashboard', href: '/dashboard' },
    ];

    // Don't show navbar on auth pages if desired, or keep it simple
    // keeping it simple for now

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
                                Sandhya<span className="text-green-600">Fitness</span>
                            </Link>
                        </div>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${pathname === link.href
                                        ? 'border-blue-600 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={handleLogout}
                            className="ml-4 p-2 text-gray-400 hover:text-gray-500 transition-colors"
                            title="Sign Out"
                        >
                            <FaSignOutAlt />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
