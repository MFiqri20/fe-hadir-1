import * as yup from "yup";
export const LupaPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Email wajib di isi"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Wajib isi"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),
});

export const ResetPasswordScehema = yup.object().shape({
  new_password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),

  confirm_password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),
});

//Guru

export const updateGuruSchema = yup.object().shape({
  nama: yup.string().optional(),
  initial_schedule: yup.string().optional(),
  email: yup.string().email("Email tidak valid").optional(),
  password: yup
    .string()
    .min(8, "Password harus terdiri dari minimal 8 karakter")
    .optional(),
  mapel: yup
    .array()
    .of(yup.number().optional())
    .min(1, "Minimal pilih satu mapel")
    .optional(),
});
export const createGuruSchema = yup.object().shape({
  nama: yup.string().required("Nama wajib diisi"),
  initial_schedule: yup.string().required("Intial Schedule wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup
    .string()
    .min(8, "Password harus terdiri dari minimal 8 karakter")
    .required("Password wajib diisi"),
  mapel: yup
    .array()
    .of(yup.number().required("Mapel ID wajib diisi"))
    .min(1, "Minimal pilih satu mapel")
    .required("Mapel wajib diisi"),
});

//jadwal
export const createJadwalSchema = yup.object().shape({
  hari_id: yup.number().nullable().default(0).required("Wajib isi"),
  jam_jadwal: yup
    .array()
    .of(
      yup.object().shape({
        jam_mulai: yup.string().nullable().default("").required("Wajib isi"),
        jam_selesai: yup.string().nullable().default("").required("Wajib isi"),
        is_rest: yup.boolean().required("Wajib isi"),
        jam_detail: yup.array().of(
          yup.object().shape({
            subject_code: yup.number().required("Wajib isi"),
            kelas: yup.number().required("Wajib isi"),
          })
        ),
      })
    )
    .required("Wajib isi"),
});

export const updateJadwalSchema = yup.object().shape({
  hari_id: yup.number().nullable(),
  jam_jadwal: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().nullable(),
        jam_mulai: yup.string().nullable(),
        jam_selesai: yup.string().nullable(),
        is_rest: yup.boolean().nullable(),
        jam_detail: yup.array().of(
          yup.object().shape({
            id: yup.number().nullable(),
            subject_code: yup.number().nullable(),
          })
        ),
      })
    )
    .nullable(),
});

//mapel
export const createMapelSchema = yup.object().shape({
  nama_mapel: yup.string().nullable().default("").required("Wajib isi"),
  status_mapel: yup.string().nullable().default("").required("Wajib isi"),
});

export const createBulkMapelSchema = yup.object().shape({
  data: yup
    .array()
    .of(
      yup.object().shape({
        nama_mapel: yup.string().required("Nama mapel wajib diisi").default(""),
        status_mapel: yup
          .string()
          .required("Status mapel wajib diisi")
          .default(""),
      })
    )
    .required("Data mapel wajib diisi"),
});
