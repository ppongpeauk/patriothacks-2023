import { tokenToID } from "@/firebase";
import clientPromise from "@/lib/ddb";
import type { NextApiRequest, NextApiResponse } from "next";
import { generate as generateString } from "randomstring";

type FallbackData = {
  error: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description, price, category, type } = req.body as any;

  const mongoClient = await clientPromise;
  const db = mongoClient.db(process.env.MONGODB_DB);

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const uid = await tokenToID(token as string);
  if (!uid) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  console.log(req.body);

  // check body
  if (!name || !description || !price || !category || !type) {
    // return res.status(400).json({ message: "Missing fields!" });
  }

  const listingId = generateString({
    length: 16,
    charset: "alphanumeric",
    capitalization: "lowercase",
  });

  db.collection("listings").insertOne({
    id: listingId,
    name,
    description,
    category,
    type,
    author: uid,
    createdAt: new Date(),
    media: ["/assets/branding/placeholder.png"],
    icon: "/assets/branding/placeholder.png",
    active: true,
    price,
    attributes: {
      "Attribute 1": "Lorem ipsum",
      "Attribute 2": "Lorem ipsum",
      "Attribute 3": "Lorem ipsum",
    },
  });

  return res.status(200).json({ id: listingId });
}
