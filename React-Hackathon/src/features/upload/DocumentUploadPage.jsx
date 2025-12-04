// pages/DocumentUploadPage.jsx
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
import useUploadStore from "./uploadStore";
import { toast, Toaster } from "react-hot-toast";

export default function DocumentUploadPage() {
    const { files, addFiles, removeFile, clearAll, uploadAll } =
        useUploadStore();

    const [dragActive, setDragActive] = useState(false);

    /* ---------------------
         Drag Events
    ---------------------- */
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover")
            setDragActive(true);
        if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);

        if (e.dataTransfer.files) {
            addFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            addFiles(e.target.files);
        }

        // 👇 Reset the input so choosing the same file triggers onChange
        e.target.value = "";
    };

    const handleUpload = async () => {
        const res = await uploadAll();
        toast.success("Upload complete!", {
            style: {
                background: "var(--color-surface-base)",
                border: "1px solid var(--color-primary)",
                color: "var(--color-text-main)",
                padding: "14px 18px",
                borderRadius: "12px",
                boxShadow: "0 15px 40px -10px rgba(213,255,64,0.25)",
            },
            iconTheme: {
                primary: "var(--color-primary)",
                secondary: "var(--color-text-dark)",
            },
        });

        clearAll();
    };

    /* ---------------------
        Helpers
    ---------------------- */
    const getFileIcon = (fileType) => {
        if (fileType === "image") return FileImage;
        if (fileType === "code") return FileCode;
        if (fileType === "archive") return FileArchive;
        return File;
    };

    const totalSizeMB = files.reduce((acc, f) => acc + f.size / 1024 / 1024, 0);

    /* ---------------------
         UI Rendering
    ---------------------- */
    return (
        <>
            <div>
                <Toaster />
            </div>
            <div
                className='min-h-full p-8'
                style={{ backgroundColor: "#0d0d0d" }}
            >
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
                            Drag & drop your documents or click to browse.
                            Supports all file types with real-time upload.
                        </p>
                    </div>

                    {/* Stats Bar */}
                    {files.length > 0 && (
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            {/* Total Files */}
                            <StatsCard
                                label='Files Added'
                                value={files.length}
                            />

                            {/* Total Size */}
                            <StatsCard
                                label='Total Size'
                                value={`${totalSizeMB.toFixed(2)} MB`}
                            />

                            {/* Completed */}
                            <StatsCard
                                label='Uploaded'
                                value={`${
                                    files.filter((f) => f.status === "success")
                                        .length
                                }/${files.length}`}
                            />
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

                        <DropArea dragActive={dragActive} />
                    </div>

                    {/* Uploaded List */}
                    {files.length > 0 && (
                        <div className='space-y-4'>
                            <div className='flex items-center justify-between'>
                                <h3
                                    className='text-xl font-bold'
                                    style={{ color: "#f0f0f0" }}
                                >
                                    Files to Upload
                                </h3>

                                <button
                                    onClick={clearAll}
                                    className='px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200'
                                    style={{
                                        backgroundColor: "#2a2a2a",
                                        borderColor: "#333333",
                                        color: "#888888",
                                    }}
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className='grid grid-cols-1 gap-3'>
                                {files.map((file) => {
                                    const FileIcon = getFileIcon(file.type);

                                    return (
                                        <FileItem
                                            file={file}
                                            FileIcon={FileIcon}
                                            removeFile={removeFile}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {files.length > 0 && (
                        <div className='flex items-center justify-center gap-4 pt-4'>
                            {/* Upload All */}
                            <button
                                onClick={handleUpload}
                                className='px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-200'
                                style={{
                                    background:
                                        "linear-gradient(to right, #d5ff40, #c6e03a)",
                                    color: "#1a1a1a",
                                    boxShadow:
                                        "0 20px 60px -10px rgba(213, 255, 64, 0.3)",
                                }}
                            >
                                Upload {files.length} File
                                {files.length !== 1 ? "s" : ""}
                            </button>

                            {/* Save Later */}
                            <button
                                className='px-8 py-4 rounded-xl border font-semibold text-lg transition-all duration-200'
                                style={{
                                    backgroundColor: "#1a1a1a",
                                    borderColor: "#333333",
                                    color: "#f0f0f0",
                                }}
                            >
                                Save for Later
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

/* ======================================================
    SUB COMPONENTS
====================================================== */

const StatsCard = ({ label, value }) => (
    <div
        className='p-4 rounded-xl border'
        style={{ backgroundColor: "#1a1a1a", borderColor: "#333333" }}
    >
        <div className='text-2xl font-bold' style={{ color: "#d5ff40" }}>
            {value}
        </div>
        <div className='text-sm' style={{ color: "#888888" }}>
            {label}
        </div>
    </div>
);

const DropArea = ({ dragActive }) => (
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
        <div className='relative flex flex-col items-center justify-center gap-6'>
            {/* Icon */}
            <div className='relative'>
                <div
                    className='relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl'
                    style={{
                        background:
                            "linear-gradient(to bottom right, #d5ff40, #c6e03a)",
                        boxShadow: "0 20px 60px -10px rgba(213, 255, 64, 0.4)",
                        transform: dragActive
                            ? "scale(1.1) rotate(6deg)"
                            : "scale(1)",
                    }}
                >
                    <Upload
                        className='w-12 h-12'
                        style={{ color: "#1a1a1a" }}
                    />
                </div>
            </div>

            <div className='text-center space-y-2'>
                <p className='text-2xl font-bold' style={{ color: "#f0f0f0" }}>
                    {dragActive ? "Drop files here!" : "Drop files to upload"}
                </p>
                <p className='text-base' style={{ color: "#888888" }}>
                    or <span style={{ color: "#d5ff40" }}>click to browse</span>
                </p>
            </div>

            {/* File formats */}
            <div className='flex flex-wrap items-center justify-center gap-3 pt-4'>
                {["PDF", "DOCX", "PNG", "ZIP", "JPG"].map((format) => (
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

            <div className='pt-2 text-sm' style={{ color: "#888888" }}>
                Maximum file size:{" "}
                <span style={{ color: "#d5ff40" }}>50 MB</span>
            </div>
        </div>
    </div>
);

const FileItem = ({ file, FileIcon, removeFile }) => (
    <div
        className='group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200'
        style={{ backgroundColor: "#1a1a1a", borderColor: "#333333" }}
    >
        {/* Icon */}
        <div
            className='w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0'
            style={{ backgroundColor: "rgba(213,255,64,0.1)" }}
        >
            <FileIcon className='w-6 h-6' style={{ color: "#d5ff40" }} />
        </div>

        {/* Info */}
        <div className='flex-1 min-w-0'>
            <p
                className='text-sm font-semibold truncate mb-1'
                style={{ color: "#f0f0f0" }}
            >
                {file.name}
            </p>

            <div className='flex items-center gap-3'>
                <p className='text-xs' style={{ color: "#888888" }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <div className='w-1 h-1 rounded-full bg-gray-700' />
                <p className='text-xs capitalize' style={{ color: "#888888" }}>
                    {file.type}
                </p>
            </div>
        </div>

        {/* Progress */}
        {file.status === "uploading" && (
            <div className='flex-1 max-w-xs'>
                <div className='h-2 rounded-full overflow-hidden bg-gray-800'>
                    <div
                        className='h-full transition-all duration-300 rounded-full'
                        style={{
                            width: `${file.progress}%`,
                            backgroundColor: "#d5ff40",
                        }}
                    />
                </div>
            </div>
        )}

        {/* Status */}
        {file.status === "success" && (
            <Badge
                icon={CheckCircle}
                text='Uploaded'
                color='#22c55e'
                bg='rgba(34,201,94,0.1)'
            />
        )}

        {file.status === "error" && (
            <Badge
                icon={AlertCircle}
                text='Failed'
                color='#ef4444'
                bg='rgba(239,68,68,0.1)'
            />
        )}

        {/* Remove */}
        <button
            onClick={() => removeFile(file.id)}
            className='p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all'
        >
            <X className='w-4 h-4' style={{ color: "#888888" }} />
        </button>
    </div>
);

const Badge = ({ icon: Icon, text, color, bg }) => (
    <div
        className='flex items-center gap-2 px-3 py-1 rounded-lg'
        style={{ backgroundColor: bg }}
    >
        <Icon className='w-4 h-4' style={{ color }} />
        <span className='text-xs font-medium' style={{ color }}>
            {text}
        </span>
    </div>
);
