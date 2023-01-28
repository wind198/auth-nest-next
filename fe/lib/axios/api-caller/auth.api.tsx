import { AxiosInstance } from "axios";
import { createContext, PropsWithChildren } from "react";
import { GenerateApiCallerContext } from ".";
import { baseAxiosIntance } from "..";
import { GenerateOneWayContext, joinUrlSegment } from "../../helpers";
import useAxios from "../../helpers/useAxios";

type ILoginDto = {
  email: string;
  password: string;
};

export class AuthApiCaller {
  axiosInstance: AxiosInstance;
  url = "auth";

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  login(body: ILoginDto) {
    const url = joinUrlSegment(this.url, "login");
    return this.axiosInstance.post(url, body);
  }
}
export const {
  ModularApiCallerContext: AuthApiCallerContext,
  ModularApiCallerProvider: AuthApiCallerProvider,
} = GenerateApiCallerContext(
  AuthApiCaller,
  baseAxiosIntance,
  "AuthApiProvider"
);
