interface College {
  name: string;
  domain: string;
  id: string;
}

interface UserCollege extends College {
  residenceHall: string;
}

interface CollegeInfo extends College {
  description: string;
  icon: string;
  members: User[];
}

interface User {
  id: string;
  name: string;
  username: string;
  description?: string;
  icon: string;
  email: string;
  createdAt: Date;
  interests: string[];
  college?: UserCollege;
}

enum ListingType {
  Item = "ITEM",
  Service = "SERVICE",
}

interface Listing {
  id: string;
  type: string;
  name: string;
  description: string;
  active: boolean;
  icon: string;
  media: string[];
  rating: number;
  price: number;
  author: User;
  confidence: number;
  attributes: any;
  tags: string[];
  createdAt: Date;
}

interface Item extends Listing {
  price: number;
}

interface ServiceType {
  id: string;
  title: string;
  icon: string;
  description: string;
  attributes: string[];
  active: boolean;
  price: number;
}
interface Service extends Listing {
  price: number;
  appointments: Appointment[];
  attributes: {
    location: string;
  };
  serviceTypes: ServiceType[];
}

interface Appointment {
  author: User;
  id: string;
  start: Date;
  end: Date;
}

export { ListingType };
export type { Appointment, Item, Listing, Service, User };
