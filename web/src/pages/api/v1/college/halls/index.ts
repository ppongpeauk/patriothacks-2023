import type { User } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type FallbackData = {
  error: boolean;
};

type ResponseData = {
  success: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const halls = [
      "Adams",
      "Harrison",
      "Jackson",
      "Jefferson",
      "Kennedy",
      "Lincoln",
      "Madison",
      "Monroe",
      "Roosevelt",
      "Taylor",
      "Truman",
      "Wilson",
      "Washington",
      "Amherst",
      "Brunswick",
      "Carroll",
      "Dickenson",
      "Essex",
      "Franklin",
      "Grayson",
      "Blue Ridge",
      "Commonwealth",
      "Dominion",
      "Eastern Shore",
      "Hampton Roads",
      "Piedmont",
      "Sandbridge",
      "Tidewater",
      "Whitetop",
      "Liberty Square",
      "Northern Neck",
      "Potomac Heights",
      "Rogers",
      "Townhouses",
    ];

    res.status(200).json(halls);
  }
}
