import { tokenToID } from "@/firebase";
import clientPromise from "@/lib/ddb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };

  const mongoClient = await clientPromise;
  const db = mongoClient.db(process.env.MONGODB_DB);

  // const authHeader = req.headers.authorization;
  // const token = authHeader?.split(" ")[1];
  // const uid = await tokenToID(token as string);
  // if (!uid) {
  //   return res.status(401).json({ message: "Unauthorized." });
  // }

  let listing = (await db.collection("listings").findOne({ id: id })) as any;

  if (listing) {
    const uid_sub = {
      "9RZSFf6WhHTo7ptrAq76WstcDYA3": "I6OuyM0ivTbVwfDQfR4wf13T",
    } as Record<string, string>;

    let author = await db.collection("users").findOne({ id: listing.author });
    listing.author = author;

    return res.status(200).json(listing);
  } else {
    return res.status(404).json({
      error: true,
      message: "Listing not found.",
    } as any);
  }
}
