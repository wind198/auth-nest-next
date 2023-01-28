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
} from "@chakra-ui/react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useCallback, useRef } from "react";
import { baseAxiosIntance } from "../lib/axios";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log(inspect(context.req, false, null));

  try {
    const { data } = await baseAxiosIntance.get("user");
    return {
      props: {
        data,
      },
    };
  } catch (error: any) {
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
  return <Heading>Homepage</Heading>;
};

export default HomePage;
