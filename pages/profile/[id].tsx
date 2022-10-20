import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

interface Props {
  details: {
    id: string;
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
  }[];
}

const UserDetails = (props: Props) => {
  const { details } = props;
  return (
    <>
      {details.map((detail) => (
        <div>
          <div>User ID: {detail.id}</div>
          <div>Username: {detail.username}</div>
          <div className="capitalized">First Name: {detail.firstName}</div>
          <div className="capitalized">Middle Name: {detail.middleName}</div>
          <div className="capitalized">Last Name: {detail.lastName}</div>
          <div>Email: {detail.email}</div>
          <div>Phone: {detail.phone}</div>
        </div>
      ))}
    </>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const cookies = nookies.get(ctx);
  const { params } = ctx;
  const { id } = params;
  let details = null;
  if (cookies?.jwt) {
    try {
      const { data } = await axios.get(
        `https://634cd1c5f5d2cc648e952d73.mockapi.io/users?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );
      details = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (!details) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: { details },
  };
};

export default UserDetails;
