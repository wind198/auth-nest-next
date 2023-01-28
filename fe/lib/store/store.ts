import { createContext, createElement, PropsWithChildren } from "react";
import { AuthStoreProvider } from "./auth.store";

const modularStoreProvider = [AuthStoreProvider];

export const StoreProvider = (props: PropsWithChildren<{}>) =>
  modularStoreProvider.reduce(
    (p, c) => createElement(c, {}, p),
    props.children as JSX.Element
  );
