import {
  createContext,
  createElement,
  PropsWithChildren,
  useState,
} from "react";

type IAuthStoreContextProps = {
  accessToken: string;
  setAccessToken: (value: string) => void;
};

export const AuthStoreContext = createContext<IAuthStoreContextProps>({
  accessToken: "",
  setAccessToken(value) {},
});

export const AuthStoreProvider = (props: PropsWithChildren<{}>) => {
  const [accessToken, setAccessToken] = useState("");
  return createElement(
    AuthStoreContext.Provider,
    {
      value: {
        accessToken,
        setAccessToken,
      },
    },
    props.children
  );
};
