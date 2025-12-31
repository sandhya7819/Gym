'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { Button, Card } from '@/components/ui';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash } from 'react-icons/fa';


const DietPlansPage = () => {
    const [plans, setPlans] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const router = useRouter();

    const fetchPlans = async () => {
        try {
            const res = await api.get('/diet-plans');
            setPlans(res.data);
        } catch (error) {
            // handled by interceptor
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
        fetchPlans();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const payload = {
                ...data,
                macros: { protein: data.protein, carbs: data.carbs, fats: data.fats }
            };
            await api.post('/diet-plans', payload);
            toast.success('Diet plan created');
            reset();
            setShowForm(false);
            fetchPlans();
        } catch (error) {
            // handled by interceptor
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await api.delete(`/diet-plans/${id}`);
            toast.success('Plan deleted');
            fetchPlans();
        } catch (e) { }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-200 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Diet Plans</h1>
                    <p className="text-gray-500 mt-1">Manage nutrition and meal plans.</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)}>
                    <FaPlus className="mr-2 inline" /> New Plan
                </Button>
            </div>

            {showForm && (
                <Card className="max-w-3xl mx-auto bg-gray-50 border-blue-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <h3 className="text-lg font-semibold text-gray-900">Create New Diet Plan</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                                <input {...register('name', { required: 'Required' })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                                {errors.name && <span className="text-red-500 text-xs">Required</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Total Calories</label>
                                <input {...register('calories', { required: 'Required' })} type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea {...register('description', { required: 'Required' })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                                <input {...register('protein')} type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Carbs (g)</label>
                                <input {...register('carbs')} type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fats (g)</label>
                                <input {...register('fats')} type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <Button variant="secondary" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                            <Button type="submit">Save Plan</Button>
                        </div>
                    </form>
                </Card>
            )}

            <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3">Plan Name</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Calories</th>
                                <th className="px-6 py-3">Macros (P/C/F)</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No diet plans found. Click "New Plan" to create one.</td></tr>
                            ) : (
                                plans.map((plan: any) => (
                                    <tr key={plan.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{plan.name}</td>
                                        <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{plan.description}</td>
                                        <td className="px-6 py-4">{plan.calories}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {plan.macros?.protein}g / {plan.macros?.carbs}g / {plan.macros?.fats}g
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleDelete(plan.id)} className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default DietPlansPage;
