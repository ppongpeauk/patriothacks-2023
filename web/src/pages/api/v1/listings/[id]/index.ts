import { tokenToID } from "@/firebase";
import clientPromise from "@/lib/ddb";
import type { Item, Listing, Service, User } from "@/types";
import { ListingType } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type FallbackData = {
  error: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };

  console.log(id);

  const mongoClient = await clientPromise;
  const db = mongoClient.db(process.env.MONGODB_DB);

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  let listing = (await db.collection("listings").findOne({ id: id })) as any;

  console.log(listing);
  if (listing) {
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
