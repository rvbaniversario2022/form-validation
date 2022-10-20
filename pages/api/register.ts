import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password, firstName, middleName, lastName, email, phone } =
    req.body;

  try {
    const response = await axios.post(
      "https://634cd1c5f5d2cc648e952d73.mockapi.io/users",
      {
        username,
        email,
        firstName,
        middleName,
        lastName,
        password,
        phone,
        isLogin: true,
      }
    );

    setCookie({ res }, "jwt", response.data.jwt, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    res.status(200).end();
  } catch (e) {
    res.status(400).send(e);
  }
};

// import { users } from "../../data/users";

// import { NextApiRequest, NextApiResponse } from "next";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     res.status(200).json(users);
//   } else if (req.method === "POST") {
//     const {
//       username,
//       password,
//       firstName,
//       middleName,
//       lastName,
//       email,
//       phone,
//     } = req.body;
//     const newUser = {
//       id: Date.now(),
//       username,
//       password,
//       firstName,
//       middleName,
//       lastName,
//       email,
//       phone,
//     };
//     users.push(newUser);
//     res.status(200).json(newUser);
//   }
// }
