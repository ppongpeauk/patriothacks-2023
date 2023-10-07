interface User {
  id: string;
  name: string;
  username: string;
  description?: string;
  icon: string;
  email: string;
  createdAt: Date;
}

enum ListingType {
  Item = "ITEM",
  Service = "SERVICE",
}

interface Listing {
  id: string;
  type: ListingType;
  title: string;
  description: string;
  active: boolean;
  thumbnail: string;
  media: string[];
  createdAt: Date;
  rating: number;
  price: number;
  author: User;
}

interface Item extends Listing {
  type: ListingType.Item;
  price: number;
}

interface Service extends Listing {
  type: ListingType.Service;
  price: number;
  appointments: Appointment[];
}

interface Appointment {
  author: User;
  id: string;
  start: Date;
  end: Date;
}

export { ListingType };
export type { Appointment, Item, Listing, Service, User };
