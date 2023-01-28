/**
 * Turn constant value into React context
 */

import { createContext, createElement, PropsWithChildren } from "react";

type ISingletonProviderProps<T> = PropsWithChildren<{
  singletonValue?: T;
}>;

/**
 * Context is called oneway because it provides no methods to change the singleton value from children
 * Only ancestor of the context provider can change the singleton value by passing prop to the provider component
 * @param defaultValue is the singleton value of context in case no value is provided to the context provider component
 * @returns the context and the provider
 */
export function GenerateOneWayContext<T>(defaultValue: T) {
  const Context = createContext({
    singletonValue: defaultValue,
  });

  const Provider = (props: ISingletonProviderProps<T>) =>
    createElement(
      Context.Provider,
      {
        value: { singletonValue: props.singletonValue || defaultValue },
      },
      props.children
    );

  return { Provider, Context };
}

export const joinUrlSegment = (...segments: string[]) => {
  return segments.join("/").replaceAll(/\/\/+/g, "/");
};
