import {OrganizationCardData} from '../organization';

export interface UserModel {
  id: string;
  avatar: string;
  loginTime: number;
  email: string;
  displayName: string;
  registerTime: number;
  username: string;
}

export interface UserInfoDTO {
  userInfo: UserBaseInfo;
}

export interface UserBaseInfo {
  id: string;
  displayName: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  intro: string;
  city?: string;
  companyName?: string;
  companyTitle?: string;
  github?: string;
  blog?: string;
  payQRCode?: string;
  isValidEmail: boolean;
  followOrganizations: OrganizationCardData[];
  followUsers: UserBaseInfo[];
}

export interface ValidResult {
  isValid: boolean;
}

export type SearchNameResult = UserBaseInfo[];
