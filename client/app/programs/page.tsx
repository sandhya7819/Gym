import React from 'react';
import Link from 'next/link';

export default function ProgramsPage() {
    const programs = [
        {
            title: "Weight Loss",
            description: "A calorie-deficit focused program designed to help you shed fat while maintaining lean muscle mass.",
            duration: "12 Weeks",
            intensity: "Moderate",
            color: "green"
        },
        {
            title: "Muscle Gain",
            description: "Hypertrophy-focused workouts combined with a high-protein diet plan to maximize growth.",
            duration: "16 Weeks",
            intensity: "High",
            color: "blue"
        },
        {
            title: "General Fitness",
            description: "Balanced approach for those looking to improve cardiovascular health and overall mobility.",
            duration: "Ongoing",
            intensity: "Low-Moderate",
            color: "orange"
        }
    ];

    return (
        <div className="space-y-12 py-12">
            <section className="text-center space-y-6">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Programs</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Choose a plan that fits your goals. From rapid weight loss to sustainable muscle building, we have successful blueprints for every body type.
                </p>
            </section>

            <div className="grid md:grid-cols-3 gap-8">
                {programs.map((program, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                        <div className={`text-${program.color}-600 font-bold text-sm tracking-uppercase mb-2`}>{program.duration}</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{program.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {program.description}
                        </p>
                        <div className="border-t border-gray-100 dark:border-gray-700 pt-6 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500">Intensity: {program.intensity}</span>
                            <Link href="/signup" className={`text-${program.color}-600 font-bold hover:underline`}>
                                Join Now &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
