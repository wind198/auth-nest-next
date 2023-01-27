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
import { useCallback, useRef } from "react";
const HomePage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const login = useCallback(() => {
    const form = formRef.current;
    if (!form) return;

    const email = form.email.value;
    const password = form.password.value;

    console.log({ email, password });

    // return axios.post('');
  }, []);

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
          <Input name="email" type={"email"} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name="password" type={"password"} />
        </FormControl>

        <Button type="submit">Submit</Button>
      </Stack>
    </Center>
  );
};

export default HomePage;
