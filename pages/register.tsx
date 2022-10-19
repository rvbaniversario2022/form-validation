import RegisterForm from "../components/RegisterForm";
import axios from "axios";
import nookies from "nookies";

interface Props {}

const Register = () => {
  return <RegisterForm />;
};

export const getServerSideProps = async (ctx: any) => {
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
