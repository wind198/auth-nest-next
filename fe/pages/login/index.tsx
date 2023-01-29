import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useContext, useRef } from "react";
import { AuthApiCallerContext } from "../../lib/axios/api-caller/auth.api";
import { AuthStoreContext } from "../../lib/store/auth.store";
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080/api",
//   withCredentials: true,
// });

const LoginPage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const authApi = useContext(AuthApiCallerContext);

  const { setAccessToken } = useContext(AuthStoreContext);

  const { push } = useRouter();

  const login = useCallback(async () => {
    const form = formRef.current;
    if (!form) return;

    const email = form.email.value;
    const password = form.password.value;

    console.log({ email, password });

    const {
      data: { accessToken },
    } = await authApi.login({ email, password });

    setAccessToken(accessToken);

    push("/");
  }, [authApi, setAccessToken, push]);

  return (
    <Center w={"full"} minH="100vh">
      <Stack
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        spacing={4}
        as="form"
        minW={400}
        noValidate
        ref={formRef as any}
      >
        <Heading textAlign={"center"}>Login</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            defaultValue={"tuanbk1908@gmail.com"}
            name="email"
            type={"email"}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input defaultValue={"abc123"} name="password" type={"password"} />
        </FormControl>

        <Button type="submit">Submit</Button>
      </Stack>
    </Center>
  );
};

export default LoginPage;
