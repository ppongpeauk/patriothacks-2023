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
    res.status(200).json(["music", "art", "beauty", "books", "clothing"]);
  }
}
