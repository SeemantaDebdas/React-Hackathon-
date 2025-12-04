import React, { useState, useMemo, useEffect } from "react";
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
    X,
} from "lucide-react";

export default function DataList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(11);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedDateRange, setSelectedDateRange] = useState("all");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    // Initialize with empty array and fetch data from JSON file
    const [allCourses, setAllCourses] = useState([]);

    // Fetch JSON data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/courses.json");
                console.log(response);
                const jsonData = await response.json();

                // Transform the JSON data to include lastEditedDate as Date object
                const transformedData = jsonData.map((course) => ({
                    ...course,
                    lastEditedDate: new Date(course.lastEditedDate),
                }));

                setAllCourses(transformedData);
            } catch (error) {
                console.error("Error loading courses data:", error);
            }
        };

        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
    });

    const categories = [
        ...new Set(allCourses.map((course) => course.category)),
    ];

    const filteredAndSortedCourses = useMemo(() => {
        let filtered = [...allCourses];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(
                (course) =>
                    course.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    course.category
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((course) =>
                selectedCategories.includes(course.category)
            );
        }

        // Date range filter
        if (selectedDateRange !== "all") {
            const now = new Date();
            filtered = filtered.filter((course) => {
                const daysDiff = Math.floor(
                    (now - course.lastEditedDate) / (1000 * 60 * 60 * 24)
                );
                if (selectedDateRange === "today") return daysDiff === 0;
                if (selectedDateRange === "week") return daysDiff <= 7;
                if (selectedDateRange === "month") return daysDiff <= 30;
                return true;
            });
        }

        // Sorting
        if (sortBy) {
            filtered.sort((a, b) => {
                let aVal, bVal;

                if (sortBy === "name") {
                    aVal = a.name.toLowerCase();
                    bVal = b.name.toLowerCase();
                } else if (sortBy === "price") {
                    aVal = a.price;
                    bVal = b.price;
                } else if (sortBy === "orders") {
                    aVal = a.orders;
                    bVal = b.orders;
                } else if (sortBy === "lastEdited") {
                    aVal = a.lastEditedDate;
                    bVal = b.lastEditedDate;
                }

                if (sortOrder === "asc") {
                    return aVal > bVal ? 1 : -1;
                } else {
                    return aVal < bVal ? 1 : -1;
                }
            });
        }

        return filtered;
    }, [
        allCourses,
        searchQuery,
        selectedCategories,
        selectedDateRange,
        sortBy,
        sortOrder,
    ]);

    const totalPages = Math.ceil(
        filteredAndSortedCourses.length / itemsPerPage
    );
    const paginatedCourses = filteredAndSortedCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
        setCurrentPage(1);
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
        setShowSortMenu(false);
        setCurrentPage(1);
    };

    const handleCreateCourse = (e) => {
        e.preventDefault();
        if (formData.name && formData.category && formData.price) {
            const newCourse = {
                id:
                    allCourses.length > 0
                        ? Math.max(...allCourses.map((c) => c.id)) + 1
                        : 1,
                name: formData.name,
                category: formData.category,
                lastEdited: "Just now",
                lastEditedDate: new Date(),
                price: parseFloat(formData.price),
                orders: 0,
                color: "bg-slate-500",
            };
            setAllCourses([newCourse, ...allCourses]);
            setFormData({ name: "", category: "", price: "" });
            setShowCreateForm(false);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(
                    1,
                    2,
                    "...",
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                );
            } else {
                pages.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages
                );
            }
        }
        return pages;
    };

    return (
        <div
            className='h-full p-8 overflow-y-auto custom-scrollbar'
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
                        <span style={{ color: "#f0f0f0" }}>
                            {filteredAndSortedCourses.length}
                        </span>
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
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
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
                        {/* Sort Button */}
                        <div className='relative'>
                            <button
                                onClick={() => {
                                    setShowSortMenu(!showSortMenu);
                                    setShowFilterMenu(false);
                                }}
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

                            {showSortMenu && (
                                <div
                                    className='absolute top-full mt-2 right-0 w-48 rounded-lg border overflow-hidden z-10'
                                    style={{
                                        backgroundColor: "#1a1a1a",
                                        borderColor: "#333333",
                                    }}
                                >
                                    <button
                                        onClick={() => handleSort("name")}
                                        className='w-full px-4 py-2 text-left transition-colors'
                                        style={{ color: "#f0f0f0" }}
                                        onMouseEnter={(e) =>
                                            (e.target.style.backgroundColor =
                                                "#2a2a2a")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.target.style.backgroundColor =
                                                "transparent")
                                        }
                                    >
                                        Name{" "}
                                        {sortBy === "name" &&
                                            (sortOrder === "asc" ? "↑" : "↓")}
                                    </button>
                                    <button
                                        onClick={() => handleSort("price")}
                                        className='w-full px-4 py-2 text-left transition-colors'
                                        style={{ color: "#f0f0f0" }}
                                        onMouseEnter={(e) =>
                                            (e.target.style.backgroundColor =
                                                "#2a2a2a")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.target.style.backgroundColor =
                                                "transparent")
                                        }
                                    >
                                        Price{" "}
                                        {sortBy === "price" &&
                                            (sortOrder === "asc" ? "↑" : "↓")}
                                    </button>
                                    <button
                                        onClick={() => handleSort("orders")}
                                        className='w-full px-4 py-2 text-left transition-colors'
                                        style={{ color: "#f0f0f0" }}
                                        onMouseEnter={(e) =>
                                            (e.target.style.backgroundColor =
                                                "#2a2a2a")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.target.style.backgroundColor =
                                                "transparent")
                                        }
                                    >
                                        Orders{" "}
                                        {sortBy === "orders" &&
                                            (sortOrder === "asc" ? "↑" : "↓")}
                                    </button>
                                    <button
                                        onClick={() => handleSort("lastEdited")}
                                        className='w-full px-4 py-2 text-left transition-colors'
                                        style={{ color: "#f0f0f0" }}
                                        onMouseEnter={(e) =>
                                            (e.target.style.backgroundColor =
                                                "#2a2a2a")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.target.style.backgroundColor =
                                                "transparent")
                                        }
                                    >
                                        Last Edited{" "}
                                        {sortBy === "lastEdited" &&
                                            (sortOrder === "asc" ? "↑" : "↓")}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Filter Button */}
                        <div className='relative'>
                            <button
                                onClick={() => {
                                    setShowFilterMenu(!showFilterMenu);
                                    setShowSortMenu(false);
                                }}
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
                                {(selectedCategories.length > 0 ||
                                    selectedDateRange !== "all") && (
                                    <span
                                        className='ml-1 px-1.5 py-0.5 text-xs rounded'
                                        style={{
                                            backgroundColor: "#d5ff40",
                                            color: "#1a1a1a",
                                        }}
                                    >
                                        {selectedCategories.length +
                                            (selectedDateRange !== "all"
                                                ? 1
                                                : 0)}
                                    </span>
                                )}
                            </button>

                            {showFilterMenu && (
                                <div
                                    className='absolute top-full mt-2 right-0 w-64 rounded-lg border overflow-hidden z-10'
                                    style={{
                                        backgroundColor: "#1a1a1a",
                                        borderColor: "#333333",
                                    }}
                                >
                                    <div className='p-4'>
                                        <div className='mb-4'>
                                            <h3
                                                className='text-sm font-medium mb-2'
                                                style={{ color: "#f0f0f0" }}
                                            >
                                                Category
                                            </h3>
                                            <div className='space-y-2'>
                                                {categories.map((category) => (
                                                    <label
                                                        key={category}
                                                        className='flex items-center gap-2 cursor-pointer'
                                                    >
                                                        <input
                                                            type='checkbox'
                                                            checked={selectedCategories.includes(
                                                                category
                                                            )}
                                                            onChange={() =>
                                                                handleCategoryToggle(
                                                                    category
                                                                )
                                                            }
                                                            className='rounded'
                                                        />
                                                        <span
                                                            className='text-sm'
                                                            style={{
                                                                color: "#f0f0f0",
                                                            }}
                                                        >
                                                            {category}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3
                                                className='text-sm font-medium mb-2'
                                                style={{ color: "#f0f0f0" }}
                                            >
                                                Last Edited
                                            </h3>
                                            <select
                                                value={selectedDateRange}
                                                onChange={(e) => {
                                                    setSelectedDateRange(
                                                        e.target.value
                                                    );
                                                    setCurrentPage(1);
                                                }}
                                                className='w-full px-3 py-2 rounded border text-sm'
                                                style={{
                                                    backgroundColor: "#1a1a1a",
                                                    borderColor: "#333333",
                                                    color: "#f0f0f0",
                                                }}
                                            >
                                                <option value='all'>
                                                    All time
                                                </option>
                                                <option value='today'>
                                                    Today
                                                </option>
                                                <option value='week'>
                                                    Last 7 days
                                                </option>
                                                <option value='month'>
                                                    Last 30 days
                                                </option>
                                            </select>
                                        </div>

                                        {(selectedCategories.length > 0 ||
                                            selectedDateRange !== "all") && (
                                            <button
                                                onClick={() => {
                                                    setSelectedCategories([]);
                                                    setSelectedDateRange("all");
                                                    setCurrentPage(1);
                                                }}
                                                className='w-full mt-4 px-3 py-2 rounded text-sm transition-colors'
                                                style={{
                                                    backgroundColor: "#2a2a2a",
                                                    color: "#f0f0f0",
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.target.style.backgroundColor =
                                                        "#333333")
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.target.style.backgroundColor =
                                                        "#2a2a2a")
                                                }
                                            >
                                                Clear Filters
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setShowCreateForm(true)}
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

                {/* Create Form Modal */}
                {showCreateForm && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                        <div
                            className='w-full max-w-md rounded-lg p-6'
                            style={{ backgroundColor: "#1a1a1a" }}
                        >
                            <div className='flex items-center justify-between mb-4'>
                                <h2
                                    className='text-xl font-semibold'
                                    style={{ color: "#f0f0f0" }}
                                >
                                    Create New Course
                                </h2>
                                <button
                                    onClick={() => setShowCreateForm(false)}
                                    style={{ color: "#888888" }}
                                >
                                    <X className='w-5 h-5' />
                                </button>
                            </div>
                            <form onSubmit={handleCreateCourse}>
                                <div className='space-y-4'>
                                    <div>
                                        <label
                                            className='block text-sm mb-2'
                                            style={{ color: "#f0f0f0" }}
                                        >
                                            Course Name
                                        </label>
                                        <input
                                            type='text'
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                            className='w-full px-3 py-2 rounded border'
                                            style={{
                                                backgroundColor: "#0d0d0d",
                                                borderColor: "#333333",
                                                color: "#f0f0f0",
                                            }}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className='block text-sm mb-2'
                                            style={{ color: "#f0f0f0" }}
                                        >
                                            Category
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    category: e.target.value,
                                                })
                                            }
                                            className='w-full px-3 py-2 rounded border'
                                            style={{
                                                backgroundColor: "#0d0d0d",
                                                borderColor: "#333333",
                                                color: "#f0f0f0",
                                            }}
                                            required
                                        >
                                            <option value=''>
                                                Select category
                                            </option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            className='block text-sm mb-2'
                                            style={{ color: "#f0f0f0" }}
                                        >
                                            Price ($)
                                        </label>
                                        <input
                                            type='number'
                                            step='0.01'
                                            value={formData.price}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    price: e.target.value,
                                                })
                                            }
                                            className='w-full px-3 py-2 rounded border'
                                            style={{
                                                backgroundColor: "#0d0d0d",
                                                borderColor: "#333333",
                                                color: "#f0f0f0",
                                            }}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-3 mt-6'>
                                    <button
                                        type='button'
                                        onClick={() => setShowCreateForm(false)}
                                        className='flex-1 px-4 py-2 rounded-lg transition-colors'
                                        style={{
                                            backgroundColor: "#2a2a2a",
                                            color: "#f0f0f0",
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        className='flex-1 px-4 py-2 rounded-lg transition-colors'
                                        style={{
                                            backgroundColor: "#d5ff40",
                                            color: "#1a1a1a",
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.target.style.backgroundColor =
                                                "#c6e03a")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.target.style.backgroundColor =
                                                "#d5ff40")
                                        }
                                    >
                                        Create Course
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div
                    className='rounded-lg border overflow-hidden'
                    style={{
                        backgroundColor: "#1a1a1a",
                        borderColor: "#333333",
                    }}
                >
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

                    <div>
                        {paginatedCourses.map((course) => (
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
                                <div className='col-span-2'>
                                    ${course.price.toFixed(2)}
                                </div>
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
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className='px-3 py-1 rounded border text-sm transition-colors'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                                color: "#f0f0f0",
                            }}
                        >
                            <option value={5}>5</option>
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
                            className='p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
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
                            className='p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                                color: "#f0f0f0",
                            }}
                        >
                            <ChevronLeft className='w-4 h-4' />
                        </button>

                        {getPageNumbers().map((page, index) =>
                            page === "..." ? (
                                <span
                                    key={`ellipsis-${index}`}
                                    style={{ color: "#888888" }}
                                    className='px-2'
                                >
                                    ...
                                </span>
                            ) : (
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
                            )
                        )}

                        <button
                            onClick={() =>
                                setCurrentPage(
                                    Math.min(totalPages, currentPage + 1)
                                )
                            }
                            disabled={currentPage === totalPages}
                            className='p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
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
                            className='p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
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
}
