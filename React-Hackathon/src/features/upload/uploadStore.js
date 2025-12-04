// stores/uploadStore.js
import { create } from "zustand";
import uploadService from "./uploadService";

const useUploadStore = create((set, get) => ({
    files: [],

    // Add files (UI → store)
    addFiles: (fileList) => {
        const newFiles = Array.from(fileList).map((file) => ({
            id: Date.now() + Math.random(),
            file,
            name: file.name,
            size: file.size,
            progress: 0,
            status: "pending",
        }));

        set((state) => ({
            files: [...state.files, ...newFiles],
        }));
    },

    // Upload single file
    uploadFile: async (fileItem) => {
        try {
            set((state) => ({
                files: state.files.map((f) =>
                    f.id === fileItem.id ? { ...f, status: "uploading" } : f
                ),
            }));

            const response = await uploadService.uploadFile(fileItem.file);

            set((state) => ({
                files: state.files.map((f) =>
                    f.id === fileItem.id
                        ? { ...f, status: "success", progress: 100 }
                        : f
                ),
            }));

            return response.data;
        } catch {
            set((state) => ({
                files: state.files.map((f) =>
                    f.id === fileItem.id
                        ? { ...f, status: "error", progress: 0 }
                        : f
                ),
            }));
        }
    },

    // Upload all files at once (parallel)
    uploadAll: async () => {
        const { files, uploadFile } = get();
        await Promise.all(files.map((file) => uploadFile(file)));
    },

    // Update upload progress from axios callback
    updateProgress: (id, progress) => {
        set((state) => ({
            files: state.files.map((f) =>
                f.id === id ? { ...f, progress } : f
            ),
        }));
    },

    // Remove individual file
    removeFile: (id) => {
        set((state) => ({
            files: state.files.filter((f) => f.id !== id),
        }));
    },

    // Clear list
    clearAll: () => set({ files: [] }),
}));

export default useUploadStore;
