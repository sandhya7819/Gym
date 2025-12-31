'use client';

import React from 'react';
import { Button } from '@/components/ui';

export default function ContactPage() {
    return (
        <div className="max-w-3xl mx-auto py-12">
            <section className="text-center space-y-6 mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Get In Touch</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Have questions about our plans? Speak to a trainer today.
                </p>
            </section>

            <form className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="Doe" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none" placeholder="How can we help you?" />
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                    Send Message
                </Button>
            </form>

            <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
                <p>Or email us directly at <a href="mailto:support@sandhya.gymguide.in" className="text-green-600 hover:underline">support@sandhya.gymguide.in</a></p>
            </div>
        </div>
    );
}
