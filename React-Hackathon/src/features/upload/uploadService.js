// services/uploadService.js
import axiosClient from "../../axiosClient";

const uploadService = {
    async uploadFile(file) {
        const formData = new FormData();
        formData.append("file", file);

        return axiosClient.post("/documents/upload/storage", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
                const percent = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                console.log("Upload progress:", percent);
            },
        });
    },
};

export default uploadService;
