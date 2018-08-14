import { BaseSearch } from './base.model';

export class User {
  id: number;
  tokenId: string;
  userName: string;
  pwd?: string;
  pwdOri?: string;

  name?: string;
  permissionGroup?: number;

  constructor() {
    this.id = 0;
  }

}

export class UserPwd {
  originalPwd: string;
  originalPwdEncrypt: string;
  newPwd: string;
  newPwdEncrypt: string;
  confirmPwd: string;
}

export class UserProfile {
  userId: number;
  name: string;
  mobile: string;
  email: string;
  province: number;
  provinceName?: string;
  city: number;
  cityName?: string;
  district: number;
  districtName?: string;
  companyName: string;
  companyAddress: string;
  companyZipCode: string;

  constructor() {
    this.userId = this.province = this.city = this.district = 0;
  }

}
