import { api } from "@/lib/api";

class UploadService {
  async upload(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  }
}

export const uploadService =
  new UploadService();