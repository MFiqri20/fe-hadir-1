import { useState } from "react";

const useDownloadPdf = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadPdf = async (url: string, filename: string) => {
    setIsDownloading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      // Ambil blob dari response
      const blob = await response.blob();

      // Buat URL objek untuk blob
      const downloadUrl = window.URL.createObjectURL(new Blob([blob]));

      // Buat elemen <a> untuk mendownload file
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", filename); // Nama file untuk di-download
      document.body.appendChild(link);
      link.click();

      // Hapus elemen setelah download selesai
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setError("Terjadi kesalahan saat mendownload PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadPdf, isDownloading, error };
};

export default useDownloadPdf;
