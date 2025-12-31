'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/services/api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui';

const SignupPage = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            await api.post('/auth/register', data);
            const loginRes = await api.post('/auth/login', {
                email: data.email,
                password: data.password
            });
            localStorage.setItem('token', loginRes.data.token);
            localStorage.setItem('user', JSON.stringify(loginRes.data.user));
            toast.success('Account created successfully');
            router.push('/dashboard');
        } catch (err: any) {
            // Interceptor handles toasts
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">Join Sandhya Fitness Platform</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <div className="mt-1">
                            <input
                                {...register('name', { required: 'Name is required' })}
                                type="text"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{String(errors.name.message)}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <div className="mt-1">
                            <input
                                {...register('email', { required: 'Email is required' })}
                                type="email"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{String(errors.email.message)}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1">
                            <input
                                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } })}
                                type="password"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{String(errors.password.message)}</p>}
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
