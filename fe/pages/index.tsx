import { inspect } from "util";
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
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useCallback, useRef } from "react";
import { baseAxiosIntance } from "../lib/axios";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken } = context.req.cookies;
  try {
    const { data } = await baseAxiosIntance.get("user", {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });
    return {
      props: {
        data,
      },
    };
  } catch (error: any) {
    console.log(error);

    if (error?.response?.status === 401) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw error;
  }
}
const HomePage = (props: any) => {
  return (
    <Box>
      <Heading>Homepage</Heading>
      {props.data.map((user: any, index: number) => (
        <Text key={index}>{user.email}</Text>
      ))}
    </Box>
  );
};

export default HomePage;
