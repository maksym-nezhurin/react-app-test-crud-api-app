export interface IUser {
  username: string;
}

export interface IComment {
  _id: string;
  content: string;
  user: User;
}