import React, { useState } from "react";
import {
    Upload,
    FileText,
    X,
    CheckCircle,
    AlertCircle,
    File,
    FileImage,
    FileCode,
    FileArchive,
} from "lucide-react";

export default function DocumentUploadPage() {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState([]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (fileList) => {
        const newFiles = Array.from(fileList).map((file, idx) => {
            const ext = file.name.split(".").pop().toLowerCase();
            let type = "document";
            if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(ext))
                type = "image";
            else if (
                ["js", "jsx", "ts", "tsx", "py", "java", "cpp"].includes(ext)
            )
                type = "code";
            else if (["zip", "rar", "7z", "tar", "gz"].includes(ext))
                type = "archive";

            return {
                id: Date.now() + idx,
                name: file.name,
                size:
                    file.size < 1024 * 1024
                        ? (file.size / 1024).toFixed(2) + " KB"
                        : (file.size / (1024 * 1024)).toFixed(2) + " MB",
                status: Math.random() > 0.2 ? "success" : "error",
                type,
                uploadProgress: 100,
            };
        });
        setFiles([...files, ...newFiles]);
    };

    const removeFile = (id) => {
        setFiles(files.filter((f) => f.id !== id));
    };

    const getFileIcon = (type) => {
        switch (type) {
            case "image":
                return FileImage;
            case "code":
                return FileCode;
            case "archive":
                return FileArchive;
            default:
                return File;
        }
    };

    const totalSize = files.reduce((acc, file) => {
        const sizeInMB = file.size.includes("MB")
            ? parseFloat(file.size)
            : parseFloat(file.size) / 1024;
        return acc + sizeInMB;
    }, 0);

    return (
        <div className='min-h-full p-8' style={{ backgroundColor: "#0d0d0d" }}>
            <div className='max-w-6xl mx-auto space-y-8'>
                {/* Header */}
                <div className='text-center space-y-3'>
                    <div
                        className='inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-2xl mb-4'
                        style={{
                            background:
                                "linear-gradient(to bottom right, #d5ff40, #c6e03a)",
                            boxShadow:
                                "0 20px 60px -10px rgba(213, 255, 64, 0.3)",
                        }}
                    >
                        <Upload
                            className='w-8 h-8'
                            style={{ color: "#1a1a1a" }}
                        />
                    </div>
                    <h1
                        className='text-4xl font-bold tracking-tight'
                        style={{ color: "#f0f0f0" }}
                    >
                        Upload Your Files
                    </h1>
                    <p
                        className='text-lg max-w-2xl mx-auto'
                        style={{ color: "#888888" }}
                    >
                        Drag and drop your documents or click to browse. Support
                        for all file types with lightning-fast uploads.
                    </p>
                </div>

                {/* Stats Bar */}
                {files.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div
                            className='p-4 rounded-xl border'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                            }}
                        >
                            <div
                                className='text-2xl font-bold'
                                style={{ color: "#d5ff40" }}
                            >
                                {files.length}
                            </div>
                            <div
                                className='text-sm'
                                style={{ color: "#888888" }}
                            >
                                Files Uploaded
                            </div>
                        </div>
                        <div
                            className='p-4 rounded-xl border'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                            }}
                        >
                            <div
                                className='text-2xl font-bold'
                                style={{ color: "#d5ff40" }}
                            >
                                {totalSize.toFixed(2)} MB
                            </div>
                            <div
                                className='text-sm'
                                style={{ color: "#888888" }}
                            >
                                Total Size
                            </div>
                        </div>
                        <div
                            className='p-4 rounded-xl border'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                            }}
                        >
                            <div
                                className='text-2xl font-bold'
                                style={{ color: "#d5ff40" }}
                            >
                                {
                                    files.filter((f) => f.status === "success")
                                        .length
                                }
                                /{files.length}
                            </div>
                            <div
                                className='text-sm'
                                style={{ color: "#888888" }}
                            >
                                Successful
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload Drop Zone */}
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className='relative group'
                >
                    <input
                        type='file'
                        multiple
                        onChange={handleChange}
                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
                    />

                    <div
                        className='relative border-2 border-dashed rounded-3xl p-16 transition-all duration-300 overflow-hidden'
                        style={{
                            borderColor: dragActive ? "#d5ff40" : "#333333",
                            backgroundColor: dragActive
                                ? "rgba(213, 255, 64, 0.05)"
                                : "rgba(26, 26, 26, 0.5)",
                            transform: dragActive ? "scale(1.02)" : "scale(1)",
                        }}
                    >
                        {/* Animated Background Effect */}
                        <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                            <div
                                className='absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse'
                                style={{
                                    backgroundColor: "rgba(213, 255, 64, 0.05)",
                                }}
                            ></div>
                            <div
                                className='absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse'
                                style={{
                                    backgroundColor: "rgba(213, 255, 64, 0.05)",
                                    animationDelay: "300ms",
                                }}
                            ></div>
                        </div>

                        <div className='relative flex flex-col items-center justify-center gap-6'>
                            {/* Upload Icon with Glow */}
                            <div className='relative'>
                                <div
                                    className='absolute inset-0 rounded-full blur-2xl animate-pulse'
                                    style={{
                                        backgroundColor:
                                            "rgba(213, 255, 64, 0.2)",
                                    }}
                                ></div>
                                <div
                                    className='relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105'
                                    style={{
                                        background:
                                            "linear-gradient(to bottom right, #d5ff40, #c6e03a)",
                                        boxShadow:
                                            "0 20px 60px -10px rgba(213, 255, 64, 0.4)",
                                        transform: dragActive
                                            ? "scale(1.1) rotate(6deg)"
                                            : "scale(1)",
                                    }}
                                >
                                    <Upload
                                        className='w-12 h-12 transition-transform duration-300'
                                        style={{
                                            color: "#1a1a1a",
                                            transform: dragActive
                                                ? "translateY(4px)"
                                                : "translateY(0)",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className='text-center space-y-2'>
                                <p
                                    className='text-2xl font-bold'
                                    style={{ color: "#f0f0f0" }}
                                >
                                    {dragActive
                                        ? "Drop files here!"
                                        : "Drop files to upload"}
                                </p>
                                <p
                                    className='text-base'
                                    style={{ color: "#888888" }}
                                >
                                    or{" "}
                                    <span
                                        className='font-semibold'
                                        style={{ color: "#d5ff40" }}
                                    >
                                        click to browse
                                    </span>{" "}
                                    from your device
                                </p>
                            </div>

                            {/* Supported Formats */}
                            <div className='flex flex-wrap items-center justify-center gap-3 pt-4'>
                                {[
                                    "PDF",
                                    "DOC",
                                    "DOCX",
                                    "XLS",
                                    "PNG",
                                    "JPG",
                                    "ZIP",
                                    "TXT",
                                ].map((format) => (
                                    <span
                                        key={format}
                                        className='px-3 py-1 rounded-lg border text-xs font-medium'
                                        style={{
                                            backgroundColor: "#2a2a2a",
                                            borderColor: "#333333",
                                            color: "#888888",
                                        }}
                                    >
                                        {format}
                                    </span>
                                ))}
                            </div>

                            {/* File Size Info */}
                            <div
                                className='pt-2 text-sm'
                                style={{ color: "#888888" }}
                            >
                                Maximum file size:{" "}
                                <span
                                    className='font-semibold'
                                    style={{ color: "#d5ff40" }}
                                >
                                    50 MB
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Uploaded Files List */}
                {files.length > 0 && (
                    <div className='space-y-4'>
                        <div className='flex items-center justify-between'>
                            <h3
                                className='text-xl font-bold'
                                style={{ color: "#f0f0f0" }}
                            >
                                Uploaded Files
                            </h3>
                            <button
                                onClick={() => setFiles([])}
                                className='px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200'
                                style={{
                                    backgroundColor: "#2a2a2a",
                                    borderColor: "#333333",
                                    color: "#888888",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "#1a1a1a";
                                    e.currentTarget.style.color = "#f0f0f0";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "#2a2a2a";
                                    e.currentTarget.style.color = "#888888";
                                }}
                            >
                                Clear All
                            </button>
                        </div>

                        <div className='grid grid-cols-1 gap-3'>
                            {files.map((file) => {
                                const FileIcon = getFileIcon(file.type);
                                return (
                                    <div
                                        key={file.id}
                                        className='group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200'
                                        style={{
                                            backgroundColor: "#1a1a1a",
                                            borderColor: "#333333",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor =
                                                "rgba(213, 255, 64, 0.3)";
                                            e.currentTarget.style.boxShadow =
                                                "0 10px 30px -5px rgba(213, 255, 64, 0.05)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor =
                                                "#333333";
                                            e.currentTarget.style.boxShadow =
                                                "none";
                                        }}
                                    >
                                        {/* File Icon */}
                                        <div
                                            className='w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0'
                                            style={{
                                                backgroundColor:
                                                    file.type === "image"
                                                        ? "rgba(59, 130, 246, 0.1)"
                                                        : file.type === "code"
                                                        ? "rgba(168, 85, 247, 0.1)"
                                                        : file.type ===
                                                          "archive"
                                                        ? "rgba(249, 115, 22, 0.1)"
                                                        : "rgba(213, 255, 64, 0.1)",
                                            }}
                                        >
                                            <FileIcon
                                                className='w-6 h-6'
                                                style={{
                                                    color:
                                                        file.type === "image"
                                                            ? "#3b82f6"
                                                            : file.type ===
                                                              "code"
                                                            ? "#a855f7"
                                                            : file.type ===
                                                              "archive"
                                                            ? "#f97316"
                                                            : "#d5ff40",
                                                }}
                                            />
                                        </div>

                                        {/* File Info */}
                                        <div className='flex-1 min-w-0'>
                                            <p
                                                className='text-sm font-semibold truncate mb-1'
                                                style={{ color: "#f0f0f0" }}
                                            >
                                                {file.name}
                                            </p>
                                            <div className='flex items-center gap-3'>
                                                <p
                                                    className='text-xs'
                                                    style={{ color: "#888888" }}
                                                >
                                                    {file.size}
                                                </p>
                                                <div
                                                    className='w-1 h-1 rounded-full'
                                                    style={{
                                                        backgroundColor:
                                                            "#333333",
                                                    }}
                                                ></div>
                                                <p
                                                    className='text-xs capitalize'
                                                    style={{ color: "#888888" }}
                                                >
                                                    {file.type}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        {file.uploadProgress < 100 && (
                                            <div className='flex-1 max-w-xs'>
                                                <div
                                                    className='h-2 rounded-full overflow-hidden'
                                                    style={{
                                                        backgroundColor:
                                                            "#2a2a2a",
                                                    }}
                                                >
                                                    <div
                                                        className='h-full transition-all duration-300 rounded-full'
                                                        style={{
                                                            width: `${file.uploadProgress}%`,
                                                            backgroundColor:
                                                                "#d5ff40",
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Status & Actions */}
                                        <div className='flex items-center gap-3'>
                                            {file.status === "success" ? (
                                                <div
                                                    className='flex items-center gap-2 px-3 py-1 rounded-lg'
                                                    style={{
                                                        backgroundColor:
                                                            "rgba(34, 197, 94, 0.1)",
                                                    }}
                                                >
                                                    <CheckCircle
                                                        className='w-4 h-4'
                                                        style={{
                                                            color: "#22c55e",
                                                        }}
                                                    />
                                                    <span
                                                        className='text-xs font-medium'
                                                        style={{
                                                            color: "#22c55e",
                                                        }}
                                                    >
                                                        Success
                                                    </span>
                                                </div>
                                            ) : (
                                                <div
                                                    className='flex items-center gap-2 px-3 py-1 rounded-lg'
                                                    style={{
                                                        backgroundColor:
                                                            "rgba(239, 68, 68, 0.1)",
                                                    }}
                                                >
                                                    <AlertCircle
                                                        className='w-4 h-4'
                                                        style={{
                                                            color: "#ef4444",
                                                        }}
                                                    />
                                                    <span
                                                        className='text-xs font-medium'
                                                        style={{
                                                            color: "#ef4444",
                                                        }}
                                                    >
                                                        Failed
                                                    </span>
                                                </div>
                                            )}

                                            <button
                                                onClick={() =>
                                                    removeFile(file.id)
                                                }
                                                className='p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100'
                                                style={{
                                                    backgroundColor:
                                                        "transparent",
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
                                                <X
                                                    className='w-4 h-4'
                                                    style={{ color: "#888888" }}
                                                    onMouseEnter={(e) =>
                                                        (e.currentTarget.style.color =
                                                            "#f0f0f0")
                                                    }
                                                    onMouseLeave={(e) =>
                                                        (e.currentTarget.style.color =
                                                            "#888888")
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                {files.length > 0 && (
                    <div className='flex items-center justify-center gap-4 pt-4'>
                        <button
                            className='px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-200'
                            style={{
                                background:
                                    "linear-gradient(to right, #d5ff40, #c6e03a)",
                                color: "#1a1a1a",
                                boxShadow:
                                    "0 20px 60px -10px rgba(213, 255, 64, 0.3)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                                e.currentTarget.style.boxShadow =
                                    "0 25px 70px -10px rgba(213, 255, 64, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow =
                                    "0 20px 60px -10px rgba(213, 255, 64, 0.3)";
                            }}
                        >
                            Process {files.length} File
                            {files.length !== 1 ? "s" : ""}
                        </button>
                        <button
                            className='px-8 py-4 rounded-xl border font-semibold text-lg transition-all duration-200'
                            style={{
                                backgroundColor: "#1a1a1a",
                                borderColor: "#333333",
                                color: "#f0f0f0",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    "#2a2a2a";
                                e.currentTarget.style.borderColor =
                                    "rgba(213, 255, 64, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    "#1a1a1a";
                                e.currentTarget.style.borderColor = "#333333";
                            }}
                        >
                            Save for Later
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
