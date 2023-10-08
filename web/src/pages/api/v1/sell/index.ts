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

  const mongoClient = await clientPromise;
  const db = mongoClient.db(process.env.MONGODB_DB);

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  // TODO: create a listing
}
