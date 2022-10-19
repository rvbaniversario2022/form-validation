import axios from "axios";
import { NextApiRequest } from "next";
import nookies from "nookies";

const Profile = ({ users, id }: any) => {
  return (
    <>
      {users.map((user: any) => (
        <div>
          <div>User ID: {user.id}</div>
          <div>Username: {user.username}</div>
          <div className="capitalized">First Name: {user.firstName}</div>
          <div className="capitalized">Middle Name: {user.middleName}</div>
          <div className="capitalized">Last Name: {user.lastName}</div>
          <div>Email: {user.email}</div>
          <div>Phone: {user.phone}</div>
        </div>
      ))}
    </>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const cookies = nookies.get(ctx);
  const { params } = ctx;
  const { id } = params;
  let users = null;
  if (cookies?.jwt) {
    console.log(users);
    try {
      const { data } = await axios.get(
        `https://634cd1c5f5d2cc648e952d73.mockapi.io/users?id=${id}`,
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
    props: { users, id },
  };
};

export default Profile;
