import RegisterForm from "../components/RegisterForm";
import axios from "axios";
import nookies from "nookies";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { NextPageContext, NextApiRequest } from "next";
import { ParsedQs } from "qs";

interface Props {}

const Register = () => {
  return <RegisterForm />;
};

export const getServerSideProps = async (
  ctx:
    | Pick<NextPageContext, "req">
    | { req: NextApiRequest }
    | {
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
      }
    | null
    | undefined
) => {
  const cookies = nookies.get(ctx);
  let user = null;
  if (cookies?.jwt) {
    try {
      const { data } = await axios.get(
        `https://634cd1c5f5d2cc648e952d73.mockapi.io/users/`,
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );
      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};

export default Register;
