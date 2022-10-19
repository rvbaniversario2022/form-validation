import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  destroyCookie({ res }, "jwt", {
    path: "/",
  });

  res.status(200).end();
};
