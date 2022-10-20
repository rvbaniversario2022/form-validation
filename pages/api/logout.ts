import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";

const updateIsLogin = async (e: boolean) => {
  await axios.put("https://634cd1c5f5d2cc648e952d73.mockapi.io/users/8", {
    isLogin: e,
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  updateIsLogin(false);

  destroyCookie({ res }, "jwt", {
    path: "/",
  });

  res.status(200).end();
};
