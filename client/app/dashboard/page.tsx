'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui';
import api from '@/services/api';
import { FaFire, FaAppleAlt, FaDumbbell, FaRulerVertical } from 'react-icons/fa';

const Dashboard = () => {
    const [user, setUser] = useState<any>(null);
    const [dietPlans, setDietPlans] = useState([]);
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(userData));

        const fetchData = async () => {
            try {
                const dietRes = await api.get('/diet-plans');
                const workoutRes = await api.get('/workout-plans');
                setDietPlans(dietRes.data.slice(0, 5)); // Show recent 5
                setWorkoutPlans(workoutRes.data.slice(0, 5));
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [router]);

    if (!user) return null;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Welcome back, {user.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<FaFire className="text-orange-500" />} label="Avg. Calories" value="2,400" />
                <StatCard icon={<FaAppleAlt className="text-green-500" />} label="Active Diet Plans" value={String(dietPlans.length)} />
                <StatCard icon={<FaDumbbell className="text-blue-500" />} label="Workout Routines" value={String(workoutPlans.length)} />
                <StatCard icon={<FaRulerVertical className="text-purple-500" />} label="BMI Status" value="Healthy" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="overflow-hidden p-0">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">Recent Diet Plans</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3">Plan Name</th>
                                    <th className="px-6 py-3">Calories</th>
                                    <th className="px-6 py-3">Macros (P/C/F)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dietPlans.length === 0 ? (
                                    <tr><td colSpan={3} className="px-6 py-4 text-center text-gray-500">No diet plans found</td></tr>
                                ) : (
                                    dietPlans.map((plan: any) => (
                                        <tr key={plan.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{plan.name}</td>
                                            <td className="px-6 py-4">{plan.calories} kcal</td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {plan.macros?.protein}g / {plan.macros?.carbs}g / {plan.macros?.fats}g
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card className="overflow-hidden p-0">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">Recent Workout Plans</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3">Routine Name</th>
                                    <th className="px-6 py-3">Difficulty</th>
                                    <th className="px-6 py-3">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workoutPlans.length === 0 ? (
                                    <tr><td colSpan={3} className="px-6 py-4 text-center text-gray-500">No workout plans found</td></tr>
                                ) : (
                                    workoutPlans.map((plan: any) => (
                                        <tr key={plan.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{plan.name}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${plan.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                                                        plan.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-green-100 text-green-800'
                                                    }`}>
                                                    {plan.difficulty}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{plan.duration} mins</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <Card className="flex items-center space-x-4">
        <div className="p-3 bg-gray-50 rounded-full border border-gray-100">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </Card>
);

export default Dashboard;
