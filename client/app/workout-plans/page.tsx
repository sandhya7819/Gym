'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { Button, Card } from '@/components/ui';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';


const WorkoutPlansPage = () => {
    const [plans, setPlans] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const router = useRouter(); // Import useRouter next/navigation

    const fetchPlans = async () => {
        try {
            const res = await api.get('/workout-plans');
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
            const exerciseList = data.exercisesRaw.split('\n').map((ex: string) => ex.trim()).filter((ex: string) => ex);
            const payload = {
                ...data,
                exercises: exerciseList
            };
            await api.post('/workout-plans', payload);
            toast.success('Workout plan created');
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
            await api.delete(`/workout-plans/${id}`);
            toast.success('Plan deleted');
            fetchPlans();
        } catch (e) { }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-200 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Workout Plans</h1>
                    <p className="text-gray-500 mt-1">Design your exercise routines.</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)}>
                    <FaPlus className="mr-2 inline" /> New Routine
                </Button>
            </div>

            {showForm && (
                <Card className="max-w-3xl mx-auto bg-gray-50 border-blue-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <h3 className="text-lg font-semibold text-gray-900">Create New Routine</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Routine Name</label>
                                <input {...register('name', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Duration (mins)</label>
                                <input {...register('duration', { required: true })} type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                            <select {...register('difficulty', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border">
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Exercises (One per line)</label>
                            <textarea {...register('exercisesRaw', { required: true })} rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" placeholder="Squats - 3x12..."></textarea>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <Button variant="secondary" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                            <Button type="submit">Save Routine</Button>
                        </div>
                    </form>
                </Card>
            )}

            <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3">Routine Name</th>
                                <th className="px-6 py-3">Difficulty</th>
                                <th className="px-6 py-3">Duration</th>
                                <th className="px-6 py-3">Exercises</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No workout plans found. Click "New Routine" to create one.</td></tr>
                            ) : (
                                plans.map((plan: any) => (
                                    <tr key={plan.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{plan.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${plan.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                                                plan.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                {plan.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{plan.duration} mins</td>
                                        <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                                            {Array.isArray(plan.exercises) ? plan.exercises.length : 0} exercises
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

export default WorkoutPlansPage;
