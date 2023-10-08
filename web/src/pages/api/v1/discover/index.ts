import { tokenToID } from "@/firebase";
import clientPromise from "@/lib/ddb";
import type { NextApiRequest, NextApiResponse } from "next";

// AWS personalize
import {
  GetRecommendationsCommand,
  PersonalizeRuntimeClient,
} from "@aws-sdk/client-personalize-runtime";

type FallbackData = {
  error: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const uid = await tokenToID(token as string);
  if (!uid) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  if (req.method === "GET") {
    const { term = "" as string } = req.query as any;

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.MONGODB_DB);

    if (term !== "") {
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
      res.status(200).json({
        services: [],
        items: listings.filter((item) => {
          return (
            item.name.toLowerCase().includes(term.toLowerCase() as any) ||
            item.description
              .toLowerCase()
              .includes(term.toLowerCase() as any) ||
            item.category.toLowerCase().includes(term.toLowerCase() as any)
          );
        }),
      } as any);
    } else {
      console.log("uid", uid);

      // get recommendations

      const uid_sub = {
        "9RZSFf6WhHTo7ptrAq76WstcDYA3": "I6OuyM0ivTbVwfDQfR4wf13T",
      } as Record<string, string>;

      try {
        const personalizeRuntimeClient = new PersonalizeRuntimeClient({
          region: "us-east-1",
        });

        const getRecommendationsParam = {
          recommenderArn:
            "arn:aws:personalize:us-east-1:300253131122:recommender/pp-for-you",
          userId: uid_sub[uid] || uid,
          numResults: 25 /* optional */,
        };

        // Send the GetRecommendationsCommand.
        const response = await personalizeRuntimeClient.send(
          new GetRecommendationsCommand(getRecommendationsParam)
        );
        console.log("Success!", response);

        const idsToShow = (response.itemList || []).map((item) => item.itemId);

        const mongoClient = await clientPromise;
        const db = mongoClient.db(process.env.MONGODB_DB);

        let listings = await db
          .collection("listings")
          .find({ id: { $in: idsToShow } })
          .toArray();

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

        res.status(200).json({
          services: [],
          items: listings,
        } as any);

        return response; // For unit tests.
      } catch (err) {
        console.log("Error", err);
      }
    }
  }
}
