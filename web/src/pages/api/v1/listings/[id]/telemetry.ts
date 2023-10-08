import { tokenToID } from "@/firebase";
import clientPromise from "@/lib/ddb";
import type { NextApiRequest, NextApiResponse } from "next";

// AWS personalize
import {
  PersonalizeEventsClient,
  PutEventsCommand,
} from "@aws-sdk/client-personalize-events";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };

  const mongoClient = await clientPromise;
  const db = mongoClient.db(process.env.MONGODB_DB);

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const uid = await tokenToID(token as string);
  if (!uid) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  let listing = (await db.collection("listings").findOne(
    { id: id },
    {
      projection: {
        id: 1,
      },
    }
  )) as any;

  if (listing) {
    const uid_sub = {
      "9RZSFf6WhHTo7ptrAq76WstcDYA3": "I6OuyM0ivTbVwfDQfR4wf13T",
    } as Record<string, string>;

    let author = await db.collection("users").findOne({ id: listing.author });
    listing.author = author;

    // record view on AWS
    const personalizeEventsClient = new PersonalizeEventsClient({
      region: "us-east-1",
    });

    const params = {
      trackingId: "86b75b21-4661-4da4-9097-07ca83b63fcf",
      userId: uid_sub[uid as string] || uid,
      sessionId: "session1",
      eventList: [
        {
          eventType: "View",
          itemId: id,
          sentAt: new Date(),
          metricAttribution: {
            eventAttributionSource: "website",
          },
        },
      ],
    };
    const command = new PutEventsCommand(params);

    try {
      personalizeEventsClient.send(command);
    } catch (err) {
      console.log("AWS personalize error: ", err);
    }

    return res.status(200).json({ success: true });
  } else {
    return res.status(404).json({
      error: true,
      message: "Listing not found.",
    } as any);
  }
}
