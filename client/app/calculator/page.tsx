'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/services/api';
import { Button, Card } from '@/components/ui';

const CalculatorPage = () => {
    const { register: bmiRegister, handleSubmit: handleBMI } = useForm();
    const { register: calRegister, handleSubmit: handleCal } = useForm();

    const [bmiResult, setBmiResult] = useState<any>(null);
    const [calResult, setCalResult] = useState<any>(null);

    const calculateBMI = async (data: any) => {
        try {
            const res = await api.post('/calculator/bmi', data);
            setBmiResult(res.data);
        } catch (error) {
            // handled by interceptor
        }
    };

    const calculateCalories = async (data: any) => {
        try {
            const res = await api.post('/calculator/calories', data);
            setCalResult(res.data);
        } catch (error) {
            // handled by interceptor
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Health Calculators</h1>
                <p className="text-gray-500">Evidence-based tools for health metrics.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* BMI Calculator */}
                <Card>
                    <h2 className="text-xl font-bold mb-6 text-gray-900">BMI Calculation</h2>
                    <form onSubmit={handleBMI(calculateBMI)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                            <input {...bmiRegister('height', { required: true })} type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                            <input {...bmiRegister('weight', { required: true })} type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                        </div>
                        <Button className="w-full">Calculate BMI</Button>
                    </form>
                    {bmiResult && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-100 text-center">
                            <p className="text-sm text-gray-500">Your Body Mass Index</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{bmiResult.bmi}</p>
                            <p className={`mt-2 font-medium ${bmiResult.category === 'Normal weight' ? 'text-green-600' : 'text-orange-600'
                                }`}>
                                {bmiResult.category}
                            </p>
                        </div>
                    )}
                </Card>

                {/* Calorie Calculator */}
                <Card>
                    <h2 className="text-xl font-bold mb-6 text-gray-900">Caloric Needs (TDEE)</h2>
                    <form onSubmit={handleCal(calculateCalories)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                                <input {...calRegister('height', { required: true })} type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                                <input {...calRegister('weight', { required: true })} type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Age</label>
                                <input {...calRegister('age', { required: true })} type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <select {...calRegister('gender', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
                            <select {...calRegister('activityLevel', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border">
                                <option value="sedentary">Sedentary (Office Job)</option>
                                <option value="light">Light Activity (1-2 days/week)</option>
                                <option value="moderate">Moderate Activity (3-5 days/week)</option>
                                <option value="active">Active (6-7 days/week)</option>
                                <option value="veryActive">Very Active (Physical Job)</option>
                            </select>
                        </div>
                        <Button variant="primary" className="w-full bg-green-600 hover:bg-green-700 border-transparent">Calculate Calories</Button>
                    </form>
                    {calResult && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-100 text-center">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Basal Metabolic Rate</p>
                                    <p className="text-xl font-bold text-gray-900">{calResult.bmr} kcal</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Daily Maintenance</p>
                                    <p className="text-xl font-bold text-green-600">{calResult.tdee} kcal</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default CalculatorPage;
