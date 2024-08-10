import { BaseResponseSucess } from "@/lib/axiosClient";

interface DataJadwalHariIniInterface {
  jamDetailId: number;
  mapel: string;
  jam_mulai: string;
  jam_selesai: string;
  kelas: string;
  is_absen: boolean;
  is_mulai: boolean;
}

interface DetailAbsenKelasInterface
  extends Pick<
    DataJadwalHariIniInterface,
    "is_absen" | "jam_mulai" | "jam_selesai"
  > {
  kode_kelas: string;
  nama_kelas: string;
  nama_mapel: string;
  daftar_siswa: daftarSiswaInterface[];
}

interface daftarSiswaInterface {
  id: number;
  nama: string;
  status: string;
  waktu_absen: string;
}

export interface DetailAbsenKelasIResponse extends BaseResponseSucess {
  data: DetailAbsenKelasInterface;
}

export interface DataJadwalHariIniResponse {
  data: DataJadwalHariIniInterface;
}

export interface CreateAbsenGuruPayload {
  jam_detail: number | undefined;
}

export interface CreateAbsenSiswaPayload {
  kode_class: string | undefined;
}

export interface CreateKelasMasukGuruPayload {
  jam_detail: number | undefined;
}
