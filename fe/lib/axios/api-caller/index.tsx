import { AxiosInstance } from "axios";
import {
  createContext,
  createElement,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { AxiosInstanceContext, baseAxiosIntance } from "..";
import useAxios from "../../helpers/useAxios";
import { AuthApiCallerProvider } from "./auth.api";

/**
 * @param ModularApiCallerClass a class with methods to make API calls
 * @param defaultAxiosInstance the axios instance used by the fallback value of ApiCallerClass instance
 * @param providerName name of ApiCallerProvider component otherwise default "ModularApiCallerProvider"
 * @returns context and provider component of an ApiCaller instance
 */
export function GenerateApiCallerContext<T extends new (...args: any) => any>(
  ModularApiCallerClass: T,
  defaultAxiosInstance: AxiosInstance,
  providerName?: string
) {
  const ModularApiCallerContext = createContext(
    new ModularApiCallerClass(defaultAxiosInstance)
  );
  const ModularApiCallerProvider = (
    props: PropsWithChildren<{ axiosInstance?: AxiosInstance }>
  ) => {
    const axiosInstance = useAxios();
    const authApiCallerInstance = new ModularApiCallerClass(
      props.axiosInstance || axiosInstance
    );
    return (
      <ModularApiCallerContext.Provider value={authApiCallerInstance}>
        {props.children}
      </ModularApiCallerContext.Provider>
    );
  };
  if (!!providerName) {
    Object.defineProperty(ModularApiCallerProvider, "name", {
      value: providerName,
    });
  }
  return {
    ModularApiCallerContext,
    ModularApiCallerProvider,
  };
}

const modularApiCallerProviderList = [AuthApiCallerProvider];

type IApiCallerProviderProps = PropsWithChildren<{}>;
/**
 *
 * @returns the provider of all modularApiCallers (more exactly the provider of each modularApiCaller nested together)
 * This provider will wrap all other components that need to make API calls
 */
export default function ApiCallerProvider(props: IApiCallerProviderProps) {
  return modularApiCallerProviderList.reduce(
    (p, c) => createElement(c, {}, p),
    <>{props.children}</>
  );
}
