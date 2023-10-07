import type { User } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type FallbackData = {
  error: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | FallbackData>
) {
  res.status(200).json({
    id: "1",
    email: "",
    name: "Eve Holloway",
    username: "eve",
    description: "about me",
    icon: "",
    createdAt: new Date(),
  });
}
