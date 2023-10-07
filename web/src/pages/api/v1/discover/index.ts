import type { Item, Listing, Service, User } from "@/types";
import { ListingType } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type FallbackData = {
  error: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<(Item | Service | Listing | FallbackData)[]>
) {
  const { term = "" as string } = req.query as any;

  res.status(200).json({
    services: [],
    items: [
      {
        id: "1",
        type: ListingType.Item,
        price: 5.99,
        title: "Test Item",
        description: "Test",
        active: false,
        media: [],
        createdAt: new Date(),
        thumbnail: "/placeholder.jpeg",
        rating: 5,
        author: {
          id: "1",
          name: "Pete Pongpeauk",
          username: "pete",
          description: "about me",
          icon: "",
          email: "",
          createdAt: new Date(),
        },
      },
    ].filter(
      (item) =>
        term === "" ||
        item.title.toLowerCase().includes(term.toLowerCase() as any) == true
    ),
  } as any);
}
