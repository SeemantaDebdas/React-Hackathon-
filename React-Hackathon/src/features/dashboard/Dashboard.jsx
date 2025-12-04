import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    AreaChart,
    Area,
} from "recharts";
import {
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    Target,
    ShoppingCart,
    Star,
    RefreshCw,
    ChevronRight,
    MapPin,
    Tag,
    Activity,
} from "lucide-react";

export default function DashboardPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    // Stats Cards Data
    const statsCards = [
        {
            id: 1,
            title: "Total New Visitors",
            value: "22,69,852",
            subtitle: "Last 60 Minutes",
            icon: Users,
            color: "#3b82f6",
            trend: "+15.3%",
            trendUp: true,
        },
        {
            id: 2,
            title: "Total Sales",
            value: "$5,84,250",
            subtitle: "Past Growth Rate",
            icon: DollarSign,
            color: "#ef4444",
            trend: "+8.2%",
            trendUp: true,
        },
        {
            id: 3,
            title: "Conversion Rate",
            value: "69.5%",
            subtitle: "Compared Last Month",
            icon: Target,
            color: "#f97316",
            trend: "+2.1%",
            trendUp: true,
        },
        {
            id: 4,
            title: "Order Profit Margin",
            value: "38.05%",
            subtitle: "Order Profit Margin",
            icon: ShoppingCart,
            color: "#d5ff40",
            trend: "-1.5%",
            trendUp: false,
        },
    ];

    // Monthly Revenue Data (Line Chart)
    const monthlyData = [
        { name: "Jan", Revenue: 4000, Profit: 2400 },
        { name: "Feb", Revenue: 3000, Profit: 1398 },
        { name: "Mar", Revenue: 2000, Profit: 9800 },
        { name: "Apr", Revenue: 2780, Profit: 3908 },
        { name: "May", Revenue: 1890, Profit: 4800 },
        { name: "Jun", Revenue: 2390, Profit: 3800 },
        { name: "Jul", Revenue: 3490, Profit: 4300 },
    ];

    // Goal Completion Data (Bar Chart)
    const goalCompletionData = [
        { day: "5", completion: 65 },
        { day: "10", completion: 80 },
        { day: "15", completion: 45 },
        { day: "20", completion: 90 },
        { day: "25", completion: 70 },
        { day: "30", completion: 85 },
    ];

    // --- Order Status Dummy Data ---
    const orderStatusData = [
        { name: "Pending", value: 55, color: "#f97316" },
        { name: "Shipped", value: 25, color: "#3b82f6" },
        { name: "Delivered", value: 15, color: "#22c55e" },
        { name: "Cancelled", value: 5, color: "#ef4444" },
    ];

    // --- Custom Tooltip for Pie Chart ---
    const OrderStatusTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0];
            return (
                <div className='bg-surface-base border border-border/50 p-3 rounded-lg shadow-xl'>
                    <p className='text-text-main font-semibold'>{item.name}</p>
                    <p className='text-text-secondary text-sm'>
                        Orders:{" "}
                        <span className='font-bold text-primary'>
                            {item.value}%
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    // Traffic Sources Data (Pie Chart)
    const trafficData = [
        { name: "Direct", value: 400, color: "#d5ff40" },
        { name: "Search", value: 300, color: "#00bcd4" },
        { name: "Social", value: 300, color: "#ff9800" },
        { name: "Referral", value: 200, color: "#e91e63" },
    ];

    // Website Visitors Data (Area Chart)
    const visitorData = [
        { country: "India", New: 8, Returning: 5 },
        { country: "Spain", New: 12, Returning: 8 },
        { country: "Canada", New: 6, Returning: 4 },
        { country: "China", New: 14, Returning: 10 },
        { country: "Japan", New: 10, Returning: 7 },
        { country: "USA", New: 18, Returning: 13 },
        { country: "Brazil", New: 15, Returning: 11 },
    ];

    // Top Sellers Data
    const topSellers = [
        { name: "Jacob Jones", country: "India", flag: "🇮🇳", sales: 1045 },
        { name: "Albert Flores", country: "Japan", flag: "🇯🇵", sales: 1448 },
        { name: "Floyd Miles", country: "Australia", flag: "🇦🇺", sales: 748 },
        { name: "Eleanor Pena", country: "China", flag: "🇨🇳", sales: 246 },
    ];

    // Top Locations Data
    const topLocationsData = [
        { rank: 1, country: "United States", visitors: 1520, sales: 850 },
        { rank: 2, country: "Germany", visitors: 980, sales: 420 },
        { rank: 3, country: "Japan", visitors: 760, sales: 300 },
        { rank: 4, country: "Brazil", visitors: 550, sales: 180 },
        { rank: 5, country: "India", visitors: 490, sales: 120 },
    ];

    // Recent Tasks
    const recentTasks = [
        { title: "Design Tools", category: "Uishop, Landlord", date: "3 Jan" },
        { title: "Delivered", category: "Order", date: "Last Week" },
        { title: "Purchase report", category: "Delivery", date: "14 Jan" },
        {
            title: "New product order by Milan",
            category: "Order",
            date: "14 Mar",
        },
    ];

    // Customer Reviews
    const reviews = [
        { rating: 5, label: "Excellent", count: 35 },
        { rating: 4, label: "Good", count: 25 },
        { rating: 3, label: "Average", count: 20 },
        { rating: 2, label: "Avg Below", count: 15 },
        { rating: 1, label: "Poor", count: 5 },
    ];

    // Tag Cloud Data
    const tagCloudData = [
        { tag: "React", size: 30 },
        { tag: "Analytics", size: 28 },
        { tag: "Dashboard", size: 25 },
        { tag: "eCommerce", size: 20 },
        { tag: "Traffic", size: 18 },
        { tag: "SEO", size: 15 },
        { tag: "Revenue", size: 12 },
        { tag: "Profit", size: 10 },
    ];

    // Custom Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-surface-base border border-border/50 p-3 rounded-lg shadow-xl'>
                    <p className='text-primary font-semibold mb-1'>{label}</p>
                    {payload.map((entry, index) => (
                        <p
                            key={index}
                            className='text-sm'
                            style={{ color: entry.color }}
                        >
                            {entry.name}:{" "}
                            <span className='font-bold'>
                                {entry.value.toLocaleString()}
                            </span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-app-bg'>
                <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary'></div>
                <p className='ml-4 text-lg text-text-secondary'>
                    Loading Dashboard...
                </p>
            </div>
        );
    }

    return (
        <div className='p-8 space-y-6'>
            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {statsCards.map((card) => (
                    <div
                        key={card.id}
                        className='p-6 rounded-2xl bg-surface-base border border-border/50 hover:scale-[1.02] transition-all duration-200'
                    >
                        <div className='flex items-start justify-between mb-4'>
                            <div className='w-12 h-12 rounded-xl bg-surface-hover/50 border border-border/50 flex items-center justify-center'>
                                <card.icon
                                    className='w-6 h-6'
                                    style={{ color: card.color }}
                                />
                            </div>
                            <span
                                className={`text-sm font-semibold px-2 py-1 rounded-lg ${
                                    card.trendUp
                                        ? "text-primary bg-primary/10"
                                        : "text-red-400 bg-red-500/10"
                                }`}
                            >
                                {card.trend}
                            </span>
                        </div>
                        <h3 className='text-3xl font-bold text-text-main mb-1'>
                            {card.value}
                        </h3>
                        <p className='text-xs text-text-secondary font-medium uppercase tracking-wide'>
                            {card.title}
                        </p>
                        <p className='text-xs text-text-secondary/70 mt-1'>
                            {card.subtitle}
                        </p>
                    </div>
                ))}
            </div>

            {/* Main Charts Row */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Monthly Revenue Line Chart */}
                <div className='lg:col-span-2 bg-surface-base rounded-2xl border border-border/50 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h3 className='text-lg font-semibold text-text-main'>
                            Monthly Financial Overview
                        </h3>
                        <TrendingUp className='w-5 h-5 text-primary' />
                    </div>
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid
                                strokeDasharray='3 3'
                                stroke='#333333'
                            />
                            <XAxis dataKey='name' stroke='#888888' />
                            <YAxis stroke='#888888' />
                            <Tooltip
                                content={(props) => (
                                    <CustomTooltip {...props} />
                                )}
                            />

                            <Legend wrapperStyle={{ color: "#888888" }} />
                            <Line
                                type='monotone'
                                dataKey='Revenue'
                                stroke='#d5ff40'
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#1a1a1a", strokeWidth: 2 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type='monotone'
                                dataKey='Profit'
                                stroke='#00bcd4'
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#1a1a1a", strokeWidth: 2 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Order Status Pie Chart */}
                <div className='bg-surface-base rounded-2xl border border-border/50 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h3 className='text-lg font-semibold text-text-main'>
                            Order Status
                        </h3>
                        <Activity className='w-5 h-5 text-primary' />
                    </div>
                    <ResponsiveContainer width='100%' height={280}>
                        <PieChart>
                            <Pie
                                data={orderStatusData}
                                cx='50%'
                                cy='50%'
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={3}
                                dataKey='value'
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                                labelLine={false}
                            >
                                {orderStatusData.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>

                            <Tooltip
                                content={(props) => (
                                    <OrderStatusTooltip {...props} />
                                )}
                            />
                            <Legend
                                verticalAlign='bottom'
                                height={36}
                                formatter={(value, entry) => (
                                    <span className='text-text-secondary text-sm'>
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className='space-y-2 mt-4'>
                        {orderStatusData.map((status, i) => (
                            <div
                                key={i}
                                className='flex items-center justify-between text-sm'
                            >
                                <div className='flex items-center gap-2'>
                                    <div
                                        className='w-3 h-3 rounded-full'
                                        style={{
                                            backgroundColor: status.color,
                                        }}
                                    ></div>
                                    <span className='text-text-secondary'>
                                        {status.name}
                                    </span>
                                </div>
                                <span className='font-semibold text-text-main'>
                                    {status.value}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Second Row */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Goal Completion Bar Chart */}
                <div className='bg-surface-base rounded-2xl border border-border/50 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h3 className='text-lg font-semibold text-text-main'>
                            Goal Completion
                        </h3>
                        <TrendingUp className='w-5 h-5 text-primary' />
                    </div>
                    <ResponsiveContainer width='100%' height={250}>
                        <BarChart data={goalCompletionData}>
                            <CartesianGrid
                                strokeDasharray='3 3'
                                stroke='#333333'
                                vertical={false}
                            />
                            <XAxis dataKey='day' stroke='#888888' />
                            <YAxis stroke='#888888' />
                            <Tooltip
                                content={(props) => (
                                    <CustomTooltip {...props} />
                                )}
                            />

                            <Bar
                                dataKey='completion'
                                fill='#d5ff40'
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className='text-center text-xs text-primary font-medium mt-2'>
                        December Month
                    </p>
                </div>

                {/* Traffic Sources Pie Chart */}
                <div className='bg-surface-base rounded-2xl border border-border/50 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h3 className='text-lg font-semibold text-text-main'>
                            Traffic Sources
                        </h3>
                        <RefreshCw className='w-5 h-5 text-primary cursor-pointer hover:rotate-180 transition-transform duration-500' />
                    </div>
                    <ResponsiveContainer width='100%' height={250}>
                        <PieChart>
                            <Pie
                                data={trafficData}
                                cx='50%'
                                cy='50%'
                                outerRadius={90}
                                dataKey='value'
                                label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {trafficData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                content={(props) => (
                                    <CustomTooltip {...props} />
                                )}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Customer Reviews */}
                <div className='bg-surface-base rounded-2xl border border-border/50 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h3 className='text-lg font-semibold text-text-main'>
                            Customer Reviews
                        </h3>
                        <RefreshCw className='w-5 h-5 text-primary cursor-pointer hover:rotate-180 transition-transform duration-500' />
                    </div>
                    <div className='flex items-center gap-4 mb-6'>
                        <div className='flex gap-1'>
                            {[1, 2, 3, 4].map((i) => (
                                <Star
                                    key={i}
                                    className='w-5 h-5 fill-primary text-primary'
                                />
                            ))}
                            <Star className='w-5 h-5 fill-primary/40 text-primary/40' />
                        </div>
                        <div>
                            <div className='text-2xl font-bold text-text-main'>
                                4.8
                            </div>
                            <div className='text-xs text-text-secondary'>
                                Out of 5 Stars
                            </div>
                        </div>
                    </div>
                    <div className='space-y-3'>
                        {reviews.map((review, i) => (
                            <div key={i}>
                                <div className='flex items-center justify-between mb-1'>
                                    <span className='text-sm text-text-secondary'>
                                        {review.label}
                                    </span>
                                    <span className='text-sm font-semibold text-text-main'>
                                        {review.count}
                                    </span>
                                </div>
                                <div className='h-2 bg-surface-hover rounded-full overflow-hidden'>
                                    <div
                                        className='h-full rounded-full bg-primary'
                                        style={{
                                            width: `${
                                                (review.count / 35) * 100
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Third Row */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Top Seller */}
                <div className='bg-surface-base rounded-2xl border border-border/50 p-6'>
                    <h3 className='text-lg font-semibold text-text-main mb-6'>
                        Top Seller
                    </h3>
                    <div className='space-y-4'>
                        {topSellers.map((seller, i) => (
                            <div
                                key={i}
                                className='flex items-center justify-between p-3 rounded-xl hover:bg-surface-hover transition-colors'
                            >
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center text-lg'>
                                        {seller.flag}
                                    </div>
                                    <div>
                                        <div className='text-sm font-medium text-text-main'>
                                            {seller.name}
                                        </div>
                                        <div className='text-xs text-text-secondary'>
                                            {seller.country}
                                        </div>
                                    </div>
                                </div>
                                <div className='text-sm font-semibold text-text-main'>
                                    {seller.sales}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Website Visitors Area Chart */}
                <div className='bg-surface-base rounded-2xl border border-border/50 p-6'>
                    <div className='flex items-center justify-between mb-4'>
                        <h3 className='text-lg font-semibold text-text-main'>
                            Website Visitors
                        </h3>
                        <div className='flex gap-2'>
                            <span className='text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium'>
                                New
                            </span>
                            <span className='text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium'>
                                Returning
                            </span>
                        </div>
                    </div>
                    <ResponsiveContainer width='100%' height={250}>
                        <AreaChart data={visitorData}>
                            <CartesianGrid
                                strokeDasharray='3 3'
                                stroke='#333333'
                            />
                            <XAxis
                                dataKey='country'
                                stroke='#888888'
                                tick={{ fontSize: 11 }}
                            />
                            <YAxis stroke='#888888' />
                            <Tooltip
                                content={(props) => (
                                    <CustomTooltip {...props} />
                                )}
                            />

                            <Area
                                type='monotone'
                                dataKey='New'
                                stackId='1'
                                stroke='#d5ff40'
                                fill='#d5ff40'
                                fillOpacity={0.6}
                            />
                            <Area
                                type='monotone'
                                dataKey='Returning'
                                stackId='1'
                                stroke='#3b82f6'
                                fill='#3b82f6'
                                fillOpacity={0.6}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Task Last Month */}
                <div className='bg-surface-base rounded-2xl border border-border/50 p-6'>
                    <div className='flex items-center justify-between mb-6'>
                        <h3 className='text-lg font-semibold text-text-main'>
                            Task Last Month
                        </h3>
                        <RefreshCw className='w-5 h-5 text-primary cursor-pointer hover:rotate-180 transition-transform duration-500' />
                    </div>
                    <div className='space-y-3'>
                        {recentTasks.map((task, i) => (
                            <div
                                key={i}
                                className='flex items-center justify-between p-3 rounded-xl hover:bg-surface-hover transition-colors cursor-pointer group'
                            >
                                <div>
                                    <div className='text-sm font-medium text-text-main mb-1'>
                                        {task.title}
                                    </div>
                                    <div className='text-xs text-text-secondary'>
                                        {task.category}
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='text-xs text-text-secondary'>
                                        {task.date}
                                    </span>
                                    <ChevronRight className='w-4 h-4 text-text-secondary group-hover:text-primary transition-colors' />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Locations and Tag Cloud */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Top Locations */}
                <div className='bg-surface-base rounded-2xl border border-border/50 p-6'>
                    <h3 className='text-lg font-semibold text-text-main mb-4 flex items-center'>
                        <MapPin className='w-5 h-5 mr-2 text-primary' />
                        Top User Locations
                    </h3>
                    <div className='space-y-3'>
                        {topLocationsData.map((item) => (
                            <div
                                key={item.rank}
                                className='flex items-center justify-between p-3 rounded-xl hover:bg-surface-hover transition-colors'
                            >
                                <div className='flex items-center gap-3'>
                                    <span className='text-xl font-bold text-primary'>
                                        {item.rank}
                                    </span>
                                    <span className='text-sm font-medium text-text-main'>
                                        {item.country}
                                    </span>
                                </div>
                                <div className='flex items-center gap-6'>
                                    <span className='text-sm text-text-secondary'>
                                        {item.visitors.toLocaleString()}{" "}
                                        visitors
                                    </span>
                                    <span className='text-sm font-semibold text-primary'>
                                        ${item.sales.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tag Cloud */}
                <div className='bg-surface-base rounded-2xl border border-border/50 p-6'>
                    <h3 className='text-lg font-semibold text-text-main mb-4 flex items-center'>
                        <Tag className='w-5 h-5 mr-2 text-primary' />
                        Keyword Tag Cloud
                    </h3>
                    <div className='flex flex-wrap gap-3 justify-center items-center h-[200px]'>
                        {tagCloudData.map((item, index) => (
                            <span
                                key={item.tag}
                                className='font-bold cursor-pointer transition-all duration-200 hover:scale-110 px-2 py-1 rounded-lg'
                                style={{
                                    fontSize: `${item.size * 0.7}px`,
                                    color:
                                        index % 2 === 0 ? "#d5ff40" : "#00bcd4",
                                }}
                            >
                                {item.tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
