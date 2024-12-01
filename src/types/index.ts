export enum UserRoles {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super admin',
  USER = 'user',
  GUEST = 'guest'
}

type Email = `${string}@${string}.${string}`;

export interface IUser {
  name: string;
  email: Email;
  password: string;
  role: UserRoles;
  createdAt: Date;
}

export interface ISlot {
  date: Date;
  time: Date;
  isBooked: boolean;
}

export interface IComment {
  content: React.ReactNode,
  article: string,
  createdAt: string,
  updatedAt: string,
  user: string,
  _id: string
}

export enum Status {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived'
}

export type IBooking = {
  createdAt?: Date,
  date?: Date,
  deletedAt?: Date,
  firstName: string,
  isDeleted?: boolean,
  lastName: string,
  updatedAt?: string,
  _id: string,
};

export interface IArticle {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
    _id: string;
  };
  createdAt: string;
  status: Status;
  comments: IComment[];
  tags: string[];
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number,
  availability: number;
  isDeleted: boolean,
  image: string
}

export interface IPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface ISplashImage {
  alt_description: string;
  urls: {
    regular: string;
  };
  width: number;
  height: number;
}

export interface INews {
  title: string,
  url: string,
  urlToImage: string,
  description: string,
  publishedAt: Date,
  source: {
    name: string
  },
  author: string
}

export interface AIImage {
  name: string;
  imageData: string;
}

export enum State {
  error = 'error',
  success = 'success',
  warning = 'warning'
}

export interface IClarifyData {
  available: boolean;
  numberOfRequests: number;
  numberOfRealRequests: number;
  state: State;
}

export type TToken = null | string;