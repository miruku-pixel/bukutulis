"use client";

import {
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    BarChart3
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const salesData = [
    { name: 'Jan', total: 2400 },
    { name: 'Feb', total: 1398 },
    { name: 'Mar', total: 9800 },
    { name: 'Apr', total: 3908 },
    { name: 'May', total: 4800 },
    { name: 'Jun', total: 3800 },
    { name: 'Jul', total: 4300 },
    { name: 'Aug', total: 2400 },
    { name: 'Sep', total: 1398 },
    { name: 'Oct', total: 9800 },
    { name: 'Nov', total: 3908 },
    { name: 'Dec', total: 4800 },
];

const productRankData = [
    { name: 'Gourmet Coffee', sales: 4200 },
    { name: 'Silk Scarf', sales: 3800 },
    { name: 'Handmade Vase', sales: 3500 },
    { name: 'Organic Tea', sales: 3100 },
    { name: 'Artisanal Soap', sales: 2900 },
    { name: 'Wool Blanket', sales: 2600 },
    { name: 'Ceramic Plate', sales: 2300 },
    { name: 'Canvas Tote', sales: 1900 },
    { name: 'Glass Candle', sales: 1600 },
    { name: 'Wooden Spoon', sales: 1200 },
];

const SalesChart = () => (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold text-zinc-800 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    Sales Analysis
                </h2>
                <p className="text-xs text-zinc-500">Monthly sales performance for the current year</p>
            </div>
            <div className="px-3 py-1 bg-zinc-50 rounded-lg text-xs font-medium text-zinc-600 border border-zinc-200">Monthly</div>
        </div>

        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                        dataKey="name"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        itemStyle={{ color: '#1e293b' }}
                        cursor={{ fill: '#f1f5f9', opacity: 0.4 }}
                    />
                    <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                        {salesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#434E78' : '#64748b'} fillOpacity={0.8} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const ProductRankChart = () => (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
                <h2 className="text-lg font-semibold text-zinc-800 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    Top 10 Products
                </h2>
                <p className="text-xs text-zinc-500">Most purchased products by sales volume</p>
            </div>
            <div className="px-3 py-1 bg-zinc-50 rounded-lg text-xs font-medium text-zinc-600 border border-zinc-200">Rank</div>
        </div>

        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={productRankData}
                    layout="vertical"
                    margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        width={100}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        itemStyle={{ color: '#1e293b' }}
                        cursor={{ fill: '#f1f5f9', opacity: 0.4 }}
                    />
                    <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
                        {productRankData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="#434E78" fillOpacity={1 - (index * 0.07)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default function DashboardPage() {
    const stats = [
        {
            title: "Total Revenue",
            value: "$45,231.89",
            change: "+20.1%",
            trend: "up",
            icon: <CreditCard className="h-4 w-4 text-zinc-400" />,
        },
        {
            title: "Sales",
            value: "+12,234",
            change: "+19%",
            trend: "up",
            icon: <CreditCard className="h-4 w-4 text-zinc-400" />,
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-800">Dashboard Overview</h1>
                <p className="text-zinc-500 text-sm">Welcome back! Here&apos;s what&apos;s happening with your projects today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <div key={index} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300 transition-colors">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium text-zinc-500">{stat.title}</h3>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-zinc-800">{stat.value}</div>
                            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                                {stat.trend === "up" ? (
                                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                                ) : (
                                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                                )}
                                <span className={stat.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                                    {stat.change}
                                </span>{" "}
                                from last month
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <SalesChart />
                <ProductRankChart />
            </div>
        </div>
    );
}
