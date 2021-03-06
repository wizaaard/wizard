import {UserModel} from '../user';

export interface DocumentComment {
  id: string;
  content: string;
  reply: string;
  createTime: number;
  up: number;
  down: number;
  user: UserModel;
  status: CommentStatus;
  documentID: string;
}

export enum CommentStatus {
  UP,
  DOWN,
  NONE,
}
