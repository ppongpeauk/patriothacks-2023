import { tokenToID } from "@/firebase";
import clientPromise from "@/lib/ddb";
import type { User } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type FallbackData = {
  error: boolean;
};

type ResponseData = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB);

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    const uid = await tokenToID(token as string);
    if (!uid) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    let user = await db.collection("users").findOne({ id: uid });

    if (user) {
      const college = await db
        .collection("universities")
        .findOne({ id: user?.college });
      user.college = college;
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: true });
    }
  }
}
