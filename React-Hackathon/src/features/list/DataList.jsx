import React, { useState } from "react";
import {
    Search,
    SlidersHorizontal,
    Filter,
    Plus,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

const DataList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(11);

    const courses = [
        {
            id: 1,
            name: "Machine Learning Fundamentals",
            category: "ML/AI",
            lastEdited: "2 days ago",
            price: "$189.00",
            orders: 342,
            icon: "🤖",
            color: "bg-purple-500",
        },
        {
            id: 2,
            name: "Deep Learning with PyTorch",
            category: "Deep Learning",
            lastEdited: "5 days ago",
            price: "$245.00",
            orders: 428,
            icon: "🧠",
            color: "bg-blue-600",
        },
        {
            id: 3,
            name: "Natural Language Processing",
            category: "NLP",
            lastEdited: "3 days ago",
            price: "$198.00",
            orders: 267,
            icon: "💬",
            color: "bg-green-500",
        },
        {
            id: 4,
            name: "Computer Vision Mastery",
            category: "Computer Vision",
            lastEdited: "2 days ago",
            price: "$215.00",
            orders: 389,
            icon: "👁️",
            color: "bg-cyan-500",
        },
        {
            id: 5,
            name: "AI Ethics & Responsible AI",
            category: "AI Ethics",
            lastEdited: "4 days ago",
            price: "$145.00",
            orders: 156,
            icon: "⚖️",
            color: "bg-amber-500",
        },
        {
            id: 6,
            name: "Generative AI & LLMs",
            category: "Gen AI",
            lastEdited: "3 days ago",
            price: "$275.00",
            orders: 512,
            icon: "✨",
            color: "bg-pink-500",
        },
        {
            id: 7,
            name: "Reinforcement Learning Pro",
            category: "RL",
            lastEdited: "4 days ago",
            price: "$229.00",
            orders: 198,
            icon: "🎮",
            color: "bg-red-500",
        },
        {
            id: 8,
            name: "AI Model Deployment",
            category: "MLOps",
            lastEdited: "6 days ago",
            price: "$199.00",
            orders: 234,
            icon: "🚀",
            color: "bg-indigo-500",
        },
        {
            id: 9,
            name: "Neural Networks from Scratch",
            category: "Deep Learning",
            lastEdited: "6 days ago",
            price: "$210.00",
            orders: 301,
            icon: "🔬",
            color: "bg-violet-500",
        },
        {
            id: 10,
            name: "AI for Data Science",
            category: "Data Science",
            lastEdited: "7 days ago",
            price: "$185.00",
            orders: 276,
            icon: "📊",
            color: "bg-teal-500",
        },
        {
            id: 11,
            name: "Transformer Architecture",
            category: "Deep Learning",
            lastEdited: "4 days ago",
            price: "$235.00",
            orders: 445,
            icon: "⚡",
            color: "bg-yellow-500",
        },
    ];

    const totalPages = 6;

    return (
        <div
            className='h-full w-full p-8'
            style={{ backgroundColor: "#0d0d0d" }}
        >
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='mb-6'>
                    <h1
                        className='text-2xl font-semibold mb-1'
                        style={{ color: "#f0f0f0" }}
                    >
                        Course List
                    </h1>
                    <p className='text-sm' style={{ color: "#888888" }}>
                        Total courses{" "}
                        <span style={{ color: "#f0f0f0" }}>57</span>
                    </p>
                </div>

                {/* Action Bar */}
                <div className='flex items-center justify-between mb-6 gap-4'>
                    <div className='flex-1 max-w-md relative'>
                        <Search
                            className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5'
                            style={{ color: "#888888" }}
                        />
                        <input
                            type='text'
                            placeholder='Search...'
                            className='w-full pl-10 pr-4 py-2 rounded-lg border transition-colors'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                                color: "#f0f0f0",
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#2a2a2a")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#1a1a1a")
                            }
                        />
                    </div>

                    <div className='flex items-center gap-3'>
                        <button
                            className='flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                                color: "#f0f0f0",
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#2a2a2a")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#1a1a1a")
                            }
                        >
                            <SlidersHorizontal className='w-4 h-4' />
                            Sort
                        </button>

                        <button
                            className='flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                                color: "#f0f0f0",
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#2a2a2a")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#1a1a1a")
                            }
                        >
                            <Filter className='w-4 h-4' />
                            Filter
                        </button>

                        <button
                            className='flex items-center gap-2 px-4 py-2 rounded-lg transition-colors'
                            style={{
                                backgroundColor: "#d5ff40",
                                color: "#1a1a1a",
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#c6e03a")
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#d5ff40")
                            }
                        >
                            <Plus className='w-4 h-4' />
                            Create New
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div
                    className='rounded-lg border overflow-hidden'
                    style={{
                        backgroundColor: "#1a1a1a",
                        borderColor: "#333333",
                    }}
                >
                    {/* Table Header */}
                    <div
                        className='grid grid-cols-12 gap-4 px-6 py-4 border-b text-xs font-medium uppercase tracking-wide'
                        style={{ color: "#888888", borderColor: "#333333" }}
                    >
                        <div className='col-span-3'>Course Name</div>
                        <div className='col-span-2'>Category</div>
                        <div className='col-span-2'>Last Edited</div>
                        <div className='col-span-2'>Price</div>
                        <div className='col-span-2'>Orders</div>
                        <div className='col-span-1'>Action</div>
                    </div>

                    {/* Table Body */}
                    <div>
                        {courses.map((course, index) => (
                            <div
                                key={course.id}
                                className='grid grid-cols-12 gap-4 px-6 py-4 border-b items-center transition-colors cursor-pointer'
                                style={{
                                    borderColor: "#333333",
                                    color: "#f0f0f0",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        "#2a2a2a")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor =
                                        "transparent")
                                }
                            >
                                <div className='col-span-3 flex items-center gap-3'>
                                    <div
                                        className={`w-10 h-10 rounded-lg ${course.color} flex items-center justify-center text-lg`}
                                    >
                                        {course.icon}
                                    </div>
                                    <span className='font-medium'>
                                        {course.name}
                                    </span>
                                </div>
                                <div
                                    className='col-span-2'
                                    style={{ color: "#888888" }}
                                >
                                    {course.category}
                                </div>
                                <div
                                    className='col-span-2'
                                    style={{ color: "#888888" }}
                                >
                                    {course.lastEdited}
                                </div>
                                <div className='col-span-2'>{course.price}</div>
                                <div className='col-span-2 flex items-center gap-2'>
                                    <span>{course.orders}</span>
                                    <svg
                                        className='w-12 h-6'
                                        style={{ color: "#d5ff40" }}
                                    >
                                        <polyline
                                            points='0,12 3,8 6,14 9,6 12,10 15,8 18,12 21,6 24,10 27,8 30,14 33,6 36,12 39,10 42,8 45,14 48,12'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='1.5'
                                        />
                                    </svg>
                                </div>
                                <div className='col-span-1 flex justify-end'>
                                    <button
                                        className='p-1 rounded transition-colors'
                                        style={{ color: "#888888" }}
                                    >
                                        <MoreVertical className='w-5 h-5' />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className='flex items-center justify-between mt-4'>
                    <div
                        className='flex items-center gap-2'
                        style={{ color: "#888888" }}
                    >
                        <span className='text-sm'>Show</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) =>
                                setItemsPerPage(Number(e.target.value))
                            }
                            className='px-3 py-1 rounded border text-sm transition-colors'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                                color: "#f0f0f0",
                            }}
                        >
                            <option value={11}>11</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span className='text-sm'>per page</span>
                    </div>

                    <div className='flex items-center gap-1'>
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className='p-2 rounded transition-colors disabled:opacity-50'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                                color: "#f0f0f0",
                            }}
                        >
                            <ChevronsLeft className='w-4 h-4' />
                        </button>
                        <button
                            onClick={() =>
                                setCurrentPage(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                            className='p-2 rounded transition-colors disabled:opacity-50'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                                color: "#f0f0f0",
                            }}
                        >
                            <ChevronLeft className='w-4 h-4' />
                        </button>

                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className='w-9 h-9 rounded transition-colors'
                                style={{
                                    backgroundColor:
                                        currentPage === page
                                            ? "#d5ff40"
                                            : "#1a1a1a",
                                    color:
                                        currentPage === page
                                            ? "#1a1a1a"
                                            : "#f0f0f0",
                                }}
                                onMouseEnter={(e) => {
                                    if (currentPage !== page)
                                        e.target.style.backgroundColor =
                                            "#2a2a2a";
                                }}
                                onMouseLeave={(e) => {
                                    if (currentPage !== page)
                                        e.target.style.backgroundColor =
                                            "#1a1a1a";
                                }}
                            >
                                {page}
                            </button>
                        ))}

                        <span style={{ color: "#888888" }} className='px-2'>
                            ...
                        </span>

                        {[4, 5, 6].map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className='w-9 h-9 rounded transition-colors'
                                style={{
                                    backgroundColor:
                                        currentPage === page
                                            ? "#d5ff40"
                                            : "#1a1a1a",
                                    color:
                                        currentPage === page
                                            ? "#1a1a1a"
                                            : "#f0f0f0",
                                }}
                                onMouseEnter={(e) => {
                                    if (currentPage !== page)
                                        e.target.style.backgroundColor =
                                            "#2a2a2a";
                                }}
                                onMouseLeave={(e) => {
                                    if (currentPage !== page)
                                        e.target.style.backgroundColor =
                                            "#1a1a1a";
                                }}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() =>
                                setCurrentPage(
                                    Math.min(totalPages, currentPage + 1)
                                )
                            }
                            disabled={currentPage === totalPages}
                            className='p-2 rounded transition-colors disabled:opacity-50'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                                color: "#f0f0f0",
                            }}
                        >
                            <ChevronRight className='w-4 h-4' />
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className='p-2 rounded transition-colors disabled:opacity-50'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                                color: "#f0f0f0",
                            }}
                        >
                            <ChevronsRight className='w-4 h-4' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataList;
