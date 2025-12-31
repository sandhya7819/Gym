import React from 'react';

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 py-12">
            <section className="text-center space-y-6">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">About Sandhya Fitness</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Transforming lives through personalized nutrition and expert training guidance.
                </p>
            </section>

            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Philosophy</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        At Sandhya Fitness, we believe that health is not just about losing weight—it's about gaining strength, confidence, and a sustainable lifestyle. Our approach combines scientific nutritional planning with custom workout regimes tailored to your specific body type and goals.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Whether you are looking to build muscle, shed fat, or simply maintain a healthy balance, our platform provides the tools and expert support you need to succeed.
                    </p>
                </div>
                <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-64 w-full flex items-center justify-center">
                    {/* Placeholder for About Image */}
                    <span className="text-gray-400 font-medium">Fitness Studio / Team Image</span>
                </div>
            </section>

            <section className="bg-green-50 dark:bg-green-900/10 p-8 rounded-2xl border border-green-100 dark:border-green-900/30">
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-4">Why Choose Us?</h2>
                <ul className="space-y-3">
                    {[
                        "Personalized 1-on-1 Coaching",
                        "Scientifically backed Diet Plans",
                        "Progress Tracking with real-time analytics",
                        "Community Support & Motivation"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                            {item}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
