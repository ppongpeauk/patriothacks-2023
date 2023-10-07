import { ListingType, type Listing, type User } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type FallbackData = {
  error: boolean;
};

type ResponseData = Listing;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({
      id: "1",
      type: ListingType.Service,
      title: "HAIR CUTTING AT THE JC!",
      description: null,
      active: true,
      thumbnail: "test",
      media: ["/placeholder.jpeg", "/placeholder2.png"],
      createdAt: new Date(),
      rating: 5,
      price: 5,
      tags: ["balls", "test"],
      attributes: {
        Location: "Johnson Center",
      },
      serviceTypes: [
        {
          id: "1",
          title: "Haircut",
          icon: "/placeholder.jpeg",
          price: 5.99,
          description:
            "I will be cutting hair at the JC! Come by and get a haircut!",
          attributes: [],
          active: true,
        },
      ],
      availability: [
        {
          id: "1",
          start: new Date(),
          end: new Date(),
        },
      ],
      author: {
        id: "1",
        name: "Pete Pongpeauk",
        username: "pete",
        description: "test",
        icon: "/placeholder.jpeg",
        email: "test",
        createdAt: new Date(),
        interests: ["test"],
        college: {
          id: "1",
          name: "George Mason University",
          description: "test",
          icon: "test",
        },
      },
      confidence: 5,
    } as any);
  }
}
