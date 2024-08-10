import useAxiosAuth from "@/hook/useAuthAxios";
import { axiosClient } from "@/lib/axiosClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  LoginPayload,
  LoginResponse,
  LupaPasswordPayload,
  ProfileResponse,
  ResetPasswordPayload,
  ResetPasswordRespone,
} from "../interface/interface";
import { useToast } from "@/hook";
import { ProfileGuruResponse } from "../../(guru)/interface";
import { ResponseSiswaProfile } from "../../(siswa)";

const useAuthModule = () => {
  const { toastError, toastSuccess, toastWarning } = useToast();

  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const getProfile = async (): Promise<ProfileResponse> => {
    return axiosAuthClient.get("/auth/profile").then((res) => res.data);
  };

  const useProfile = () => {
    const { data, isLoading, isFetching } = useQuery(
      ["/auth/profile"],
      () => getProfile(),
      {
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: !!session === true,
      }
    );

    return { data, isFetching, isLoading };
  };

  const getProfileGuru = async (): Promise<ProfileGuruResponse> => {
    return axiosAuthClient.get("/guru/profile").then((res) => res.data);
  };

  const useProfileGuru = () => {
    const { data, isLoading, isFetching } = useQuery(
      ["/guru/profile"],
      () => getProfileGuru(),
      {
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: !!session === true,
      }
    );

    return { data, isFetching, isLoading };
  };

  const getProfileSiswa = async (): Promise<ResponseSiswaProfile> => {
    return axiosAuthClient.get("/siswa/profile").then((res) => res.data);
  };

  const useProfileSiswa = () => {
    const { data, isLoading, isFetching } = useQuery(
      ["/siswa/profile"],
      () => getProfileSiswa(),
      {
        select: (response) => response,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: !!session === true,
      }
    );

    return { data, isFetching, isLoading };
  };

  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    return axiosClient.post("/auth/login", payload).then((res) => res.data);
  };

  const useLogin = () => {
    const { mutate, isLoading } = useMutation(
      (payload: LoginPayload) => login(payload),
      {
        onSuccess: async (response) => {
          console.log("response", response);

          toastSuccess(response.message);
          await signIn("credentials", {
            id: response.data.id,
            role: response.data.role,
            nama: response.data.nama,
            NIK: response.data.NIK,
            avatar: response.data.avatar,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            redirect: false,
          });
          console.log(response.data.role);

          return router.push(`/${response.data.role}/dashboard`);
        },
        onError: (error: any) => {
          if (error.response.status === 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );
    return { mutate, isLoading };
  };

  const lupaPassword = async (
    payload: LupaPasswordPayload
  ): Promise<LoginResponse> => {
    return axiosClient
      .post("auth/lupa-password", payload)
      .then((res) => res.data);
  };

  const extractNameFromEmail = (email: string): string => {
    const name = email.split("@")[0];
    return name;
  };

  const useLupaPassword = () => {
    const { mutate, isLoading } = useMutation(
      (payload: LupaPasswordPayload) => lupaPassword(payload),
      {
        onSuccess: (res: any) => {
          console.log(res.data);
          const name = extractNameFromEmail(res.data.email);
          console.log(name);
          router.push(`/check/${res.data.token}/${name}`);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );

    return { mutate, isLoading };
  };

  const ResetPassword = async (
    payload: ResetPasswordPayload,
    id: number,
    token: any
  ): Promise<ResetPasswordRespone> => {
    return axiosClient
      .post(`auth/reset-password/${id}/${token}`, payload)
      .then((res) => res.data);
  };

  const useResetPassword = (id: number, token: any) => {
    const { mutate, isLoading } = useMutation(
      (payload: ResetPasswordPayload) => ResetPassword(payload, id, token),
      {
        onSuccess: (res) => {
          toastSuccess(res.message);
          router.push("/login");
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );

    return { mutate, isLoading };
  };

  return {
    useLogin,
    useLupaPassword,
    useProfileGuru,
    useProfile,
    useResetPassword,
    useProfileSiswa,
  };
};

export default useAuthModule;
