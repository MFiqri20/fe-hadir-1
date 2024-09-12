export interface User {
  id: any;
  nama: string;
}

export type StatusMapel = "online" | "offline";

export interface Mapel {
  id: number;
  nama_mapel: string;
  status_mapel: string;
  created_at: string;
  updated_at: string;
  subject_code: string;
}

interface GuruSubjectList {
  id: number;
  created_at: string;
  updated_at: string;
  user: User;
  mapel: Mapel[];
}

export interface MapelListResponse {
  data: Mapel[];
}

export interface MapelCreatePayload
  extends Pick<Mapel, "nama_mapel" | "status_mapel"> {}

export interface MapelCreateBUlkPAyload {
  data: MapelCreatePayload[];
}

//   export interface MapelCreate extends Pick<Mapel, "nama_mapel" | "subject_code" | "status_mapel"> {}
