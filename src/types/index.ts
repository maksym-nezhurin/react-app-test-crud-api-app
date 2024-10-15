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

export type TToken = null | string;