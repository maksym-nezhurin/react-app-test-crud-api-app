export interface IUser {
  username: string;
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
  createdAt: Date,
  date: Date,
  deletedAt: Date,
  firstName: string,
  isDeleted: boolean,
  lastName: string,
  updatedAt: string,
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

export type TToken = null | string;