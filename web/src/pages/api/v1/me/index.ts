import type { User } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type FallbackData = {
  error: boolean;
};

type ResponseData = {
  success: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // fetch user data
    res.status(200).json({
      id: "1",
      email: "ppongpea@gmu.edu",
      name: "Pete Pongpeauk",
      username: "pete",
      description: "about me",
      icon: "",
      createdAt: new Date(),
      interests: ["music", "art", "beauty"],
      college: {
        id: "1",
        name: "George Mason University",
        domain: "gmu.edu",
        residenceHall: "Rogers",
      },
    } as User);
  } else if (req.method === "PATCH") {
    // update user
    res.status(200).json({
      success: true,
    } as ResponseData);
  } else {
    res.status(405).json({ error: true });
  }
}
