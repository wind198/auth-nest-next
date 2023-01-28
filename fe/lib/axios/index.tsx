import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { GenerateOneWayContext } from "../helpers";

const BackendPath = process.env.NEXT_PUBLIC_BE_PATH;

export const baseAxiosInstanceConfig: AxiosRequestConfig = {
  baseURL: BackendPath,
  withCredentials: true,
};

export const baseAxiosIntance = axios.create(baseAxiosInstanceConfig);

export const {
  Context: AxiosInstanceContext,
  Provider: AxiosInstanceProvider,
} = GenerateOneWayContext(baseAxiosIntance);

