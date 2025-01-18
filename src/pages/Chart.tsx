import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/Navbar';

const data = [
	{ name: 'Jan', value: 400 },
	{ name: 'Feb', value: 300 },
	{ name: 'Mar', value: 600 },
	{ name: 'Apr', value: 800 },
	{ name: 'May', value: 500 },
	{ name: 'Jun', value: 900 },
];

const ChartPage = () => {
	const location = useLocation();
	// Extract the initial payment data from the route state
	const isFirstTime = location.state?.isFirstTime || false;

	return (
		<div className="min-h-screen bg-black">
			<Navbar />
			<div className="container mx-auto px-4 pt-24">
				<Card className="bg-navy/50 backdrop-blur-sm border-bright-blue/20">
					<CardHeader>
						<CardTitle className="text-white">Trading Performance</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-[400px] mt-4">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={data}>
									<CartesianGrid strokeDasharray="3 3" stroke="#334155" />
									<XAxis dataKey="name" stroke="#9b87f5" />
									<YAxis stroke="#9b87f5" />
									<Tooltip
										contentStyle={{
											backgroundColor: '#001A2C',
											border: '1px solid #9b87f5',
											borderRadius: '8px',
										}}
										labelStyle={{ color: '#9b87f5' }}
									/>
									<Line type="monotone" dataKey="value" stroke="#9b87f5" strokeWidth={2} dot={{ fill: '#9b87f5', strokeWidth: 2 }} />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ChartPage;
