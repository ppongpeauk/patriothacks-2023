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
  const { term = "" as string } = req.query as any;

  const mongoClient = await clientPromise;
  const db = mongoClient.db(process.env.MONGODB_DB);

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const uid = await tokenToID(token as string);
  if (!uid) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  let listings = await db.collection("listings").find().toArray();

  let authorCache = {} as any;

  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i];
    if (authorCache[listing.author]) {
      listings[i].author = authorCache[listing.author];
    } else {
      const author = await db
        .collection("users")
        .findOne({ id: listing.author });
      authorCache[listing.author] = author;
      listings[i].author = author;
    }
  }

  // {
  //   id: "1",
  //   type: ListingType.Item,
  //   price: 5.99,
  //   title: "Test Item",
  //   description: "Test",
  //   active: false,
  //   media: [],
  //   createdAt: new Date(),
  //   thumbnail: "/placeholder.jpeg",
  //   rating: 5,
  //   author: {
  //     id: "1",
  //     name: "Pete Pongpeauk",
  //     username: "pete",
  //     description: "about me",
  //     icon: "",
  //     email: "",
  //     createdAt: new Date(),
  //   },
  // },

  res.status(200).json({
    services: [],
    items: listings.filter(
      (item) =>
        term === "" ||
        item.title.toLowerCase().includes(term.toLowerCase() as any) == true
    ),
  } as any);
}
