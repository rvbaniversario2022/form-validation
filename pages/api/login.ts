import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies, setCookie } from "nookies";
import { UserDetails } from "../../types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { password, username } = await req.body;
  try {
    const getRes = await axios.get(
      "https://634cd1c5f5d2cc648e952d73.mockapi.io/users"
    );
    const users = getRes.data;
    users.filter((user: UserDetails) => {
      if (user.username === username) {
        return user;
      }
    });

    setCookie({ res }, "jwt", "this_is_a_token", {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    res.status(200).end();

    // const postRes = await axios.post(
    //   "https://634cd1c5f5d2cc648e952d73.mockapi.io/login",
    //   {
    //     username,
    //     password,
    //   }
    // );

    // setCookie({ res }, "jwt", postRes.data, {
    //   httpOnly: true,
    //   maxAge: 30 * 24 * 60 * 60,
    //   path: "/",
    // });

    // res.status(200).end();
  } catch (e) {
    res.status(400).send(e);
  }
};
