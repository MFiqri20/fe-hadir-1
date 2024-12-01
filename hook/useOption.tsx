import { useSession } from "next-auth/react";
import useAxiosAuth from "./useAuthAxios";
import { useQuery } from "@tanstack/react-query";
import { Mapel } from "@/app/lib/(mapel)/interface";
import { SubjectCode } from "@/app/lib/(guru)/interface";

// Helper function to generate letters from A to Z
const generateAlphabetOptions = () => {
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // Generates ['A', 'B', ..., 'Z']
  return letters.map((letter) => ({
    label: letter,
    value: letter,
  }));
};

const useOptions = () => {
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();

  const getMapel = async (): Promise<any> => {
    return axiosAuthClient.get("/mapel/list").then((res) => res.data);
  };

  const getKelas = async (): Promise<any> => {
    return axiosAuthClient.get("/kelas/list").then((res) => res.data);
  };

  const { data: optionMapel, isFetching: isFetchingMapel } = useQuery(
    ["/mapel/list"],
    () => getMapel(),
    {
      enabled: !!session,
      select: (data) => {
        const options = data?.data?.map((item: Mapel) => ({
          label: item.nama_mapel,
          value: item.id,
        }));
        return options;
      },
    }
  );

  const { data: optionKelas, isFetching: isFetchingKelas } = useQuery(
    ["/kelas/list"],
    () => getKelas(),
    {
      enabled: !!session,
      select: (data) => {
        const options = data?.data?.map((item: any) => ({
          label: item.nama_kelas,
          value: item.id,
        }));
        return options;
      },
    }
  );

  // const optionKelas = KelasList.map((item) => ({
  //   label: item.nama_kelas,
  //   value: item.kelas,
  // }));

  const getHari = async (): Promise<any> => {
    return axiosAuthClient.get("/hari/list").then((res) => res.data);
  };

  const { data: optionHari, isFetching: isFetchingHari } = useQuery(
    ["/hari/list"],
    () => getHari(),
    {
      enabled: !!session,
      select: (data) => {
        const options = data?.data?.map((item: any) => ({
          label: `${item.nama_hari}`,
          value: item.id,
        }));
        return options;
      },
    }
  );

  const getSubjectCode = async (): Promise<any> => {
    return axiosAuthClient.get("/subject-code/list").then((res) => res.data);
  };

  const { data: optionSubjectCode, isFetching: isFetchingSubjectCode } =
    useQuery(["/subject-code/list"], () => getSubjectCode(), {
      enabled: !!session,
      select: (data) => {
        const options = data?.data?.map((item: SubjectCode) => ({
          label: `${item.subject_code}`,
          value: item.id,
        }));
        return options;
      },
    });

  const { data: optionJadwalCode, isFetching: isFetchingJadwalCode } = useQuery(
    ["/subject-code/list"],
    () => getSubjectCode(),
    {
      enabled: !!session,
      select: (data) => {
        const options = data?.data?.map((item: SubjectCode) => ({
          label: `${item.subject_code}`,
          value: item.subject_code,
        }));
        return options;
      },
    }
  );

  const getIntitialSchedule = async (): Promise<any> => {
    return axiosAuthClient
      .get("/initial-schedule/list")
      .then((res) => res.data);
  };

  const { data: optionInitialSchedule, isFetching: isFetchingInitialSchedule } =
    useQuery(["/initial-schedule/list"], () => getIntitialSchedule(), {
      enabled: !!session,
      select: (data) => {
        const options = data?.data?.map((item: any) => ({
          label: `${item.schedule_name}`,
          value: item.schedule_name,
        }));
        return options;
      },
    });

  //

  // Generate options for initial_schedule from A to Z
  // const optionInitialSchedule = generateAlphabetOptions();

  return {
    optionSubjectCode,
    optionKelas,
    optionMapel,
    optionHari,
    optionInitialSchedule,
    optionJadwalCode,
    isFetchingMapel,
    isFetchingHari,
    isFetchingSubjectCode,
    isFetchingJadwalCode,
    isFetchingKelas,
    isFetchingInitialSchedule,
  };
};

export default useOptions;