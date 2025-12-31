'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500/20 rounded-full blur-3xl -z-10" />
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Elevate Your <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Lifestyle</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
            Sandhya Fitness is your premier destination for personalized diet planning, advanced workout tracking, and holistic health transformation.
          </p>
          <div className="flex justify-center gap-6 mt-10">
            <Link
              href="/signup"
              className="px-10 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full font-bold text-lg hover:shadow-lg hover:shadow-green-500/30 transition transform hover:-translate-y-1"
            >
              Start Free Trial
            </Link>
            <Link
              href="/about"
              className="px-10 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Custom Diet Plans", desc: "Nutrition strategies designed specifically for your body type and goals.", color: "green" },
          { title: "Trainer Support", desc: "Get assigned expert trainers to guide your workout journey.", color: "blue" },
          { title: "Progress Analytics", desc: "Visualize your weight loss and BMI changes over time.", color: "teal" }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="p-8 bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:border-green-500/50 transition-colors"
          >
            <h3 className={`text-2xl font-bold mb-4 text-${feature.color}-600`}>{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
