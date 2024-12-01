import { useState } from "react";
import axios from "axios";

type UseDownloadPdfProps = {
  role: string; // Role pengguna, misalnya "Murid", "Guru", dll.
};

const useDownloadPdf = ({ role }: UseDownloadPdfProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadPdf = async (endpoint: string, fileName: string = "File.pdf") => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(endpoint, {
        params: { role }, // Tambahkan role sebagai parameter jika diperlukan
        responseType: "blob", // Mendapatkan respons berupa file biner
      });

      if (!response.data) {
        throw new Error("Data PDF belum tersedia");
      }

      // Membuat URL untuk file PDF
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (err: any) {
      console.error("Error downloading PDF:", err);
      setError(err.message || "Terjadi kesalahan saat mengunduh file");
    } finally {
      setIsLoading(false);
    }
  };

  return { downloadPdf, isLoading, error };
};

export default useDownloadPdf;
