export interface ResponseSiswaProfile {
  status: string;
  message: string;
  data: {
    id: number;
    avatar: string | null;
    nama: string;
    nomor_hp: string | null;
    email: string;
    role: string;
    NISN: string;
    tanggal_lahir: string;
    alamat: string;
    jam_detail_id: number | null;
  };
}
