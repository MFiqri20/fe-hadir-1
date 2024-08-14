interface JamDetail {
  id: number;
  subject_code: number;
  kelas?: number;
  nama_mapel: string;
  nama_kelas: string;
}

export interface JamJadwal {
  id: number;
  jam_mulai: string;
  jam_selesai: string;
  is_rest: boolean;
  jam_detail: JamDetail[];
}

interface Jadwal {
  id: number;
  hari_id: number;
  jam_jadwal: JamJadwal[];
}

export interface JadwalListResponse {
  data: Jadwal[];
}

export interface JadwalDetailResponse extends Jadwal {}

export interface JadwalListFilter {
  hari_id: number;
}

interface CreateJamDetail extends Pick<JamDetail, "subject_code" | "kelas"> {}
interface CreateJamJadwal
  extends Pick<JamJadwal, "jam_mulai" | "jam_selesai" | "is_rest"> {
  jam_detail: CreateJamDetail[];
}
export interface CreateJadwalPayload {
  hari_id: number;
  jam_jadwal: CreateJamJadwal[]; // This expects an array of CreateJamJadwal
}
