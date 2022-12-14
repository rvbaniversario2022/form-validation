import axios from "axios";
import nookies from "nookies";

import Navbar from "../../components/Navbar";
import Head from "next/head";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { NextPageContext, NextApiRequest } from "next";
import { ParsedQs } from "qs";
import Link from "next/link";
import ProfileData from "../../components/ProfileData";

interface Props {
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
}

const Profile = ({ users }: any) => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      {/* {users.map((user: any) => (
        <div key={user.id}>
          <Link href={`/profile/${user.id}`}>
            <a>{user.username}</a>
          </Link>
        </div>
      ))} */}
      <ProfileData users={users} />
    </>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const cookies = nookies.get(ctx);
  let users = null;
  if (cookies?.jwt) {
    try {
      const { data } = await axios.get(
        `https://634cd1c5f5d2cc648e952d73.mockapi.io/users`,
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );
      users = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (!users) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: { users },
  };
};

export default Profile;

// Profile.getInitialProps = async (req: NextApiRequest, res: NextApiResponse) => {
//   const data = parseCookies(req);

//   if (res) {
//     if (Object.keys(data).length === 0 && data.constructor === Object) {
//       res.writeHead(301, { Location: "/" });
//       res.end();
//     }
//   }

//   return {
//     data: data && data,
//   };
// };
