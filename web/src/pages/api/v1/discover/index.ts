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
  res.status(200).json({
    services: [],
    items: [
      {
        id: "1",
        type: ListingType.Item,
        price: 5.99,
        title: "Test Item",
        description: "Test",
        active: true,
        media: [],
        createdAt: new Date(),
        thumbnail:
          "https://media.discordapp.net/attachments/807809192537882647/1042890109198016582/halflife_cat.gif?width=814&height=814",
        rating: 5,
        author: {
          id: "1",
          name: "Eve Holloway",
          username: "eve",
          description: "about me",
          icon: "",
          email: "",
          createdAt: new Date(),
        },
      },
    ],
  } as any);
}
