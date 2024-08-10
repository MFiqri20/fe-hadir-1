// import { User } from "@/app/(mapel)/interface";

import { BaseResponseSucess } from "@/lib/axiosClient";
import { User } from "../../(auth)/interface/interface";

export interface GuruSubject {
  id: number;
  initial_schedule: string;
  created_at: string;
  updated_at: string;
  nama: string;
  email: string;
  mapel: Mapel[];
  jadwal_detail_id: number;
}

export interface ProfileGuruResponse extends BaseResponseSucess {
  data: GuruSubject;
}

interface Mapel {
  id: number;
  nama_mapel: string;
  status_mapel: string;
  created_at: string;
  updated_at: string;
  subject_code: string;
}

export interface GuruSubjectListResponse {
  data: GuruSubject[];
}

export interface CreateGuruPayload {
  initial_schedule: string;
  nama: string;
  email: string;
  password: string;
  mapel: number[];
}

export interface SubjectCode {
  id: number;
  nama_mapel: string;
  status_mapel: string;
  subject_code: string;
  nama_guru: string;
}

export interface SubjectCodeListResponse {
  data: SubjectCode[];
}
