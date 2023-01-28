import { useContext } from "react";
import { AxiosInstanceContext } from "../axios";

export default function useAxios() {
  const { singletonValue: axiosInstance } = useContext(AxiosInstanceContext);
  return axiosInstance;
}
