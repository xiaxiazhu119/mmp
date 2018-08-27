import { BaseSearch } from './base.model';
import { ManuscriptStatusEnum, ManuscriptSearchTypeEnum } from '@app/enums';


export class ManuscriptSearchModel extends BaseSearch {
  keyword?: string;
  category?: number;
  year?: number;
  term?: number;
  authorName?: string;
  companyName?: string;
  status?: number;
  isConfirm?: boolean;
  province?: number;
  city?: number;
  district?: number;
  type: ManuscriptSearchTypeEnum;
  userId?: number;
}

export class ManuscriptListModel {
  id: number;
  title: string;
  categoryName: string;
  status: number;
  statusName: string;
  userId: number;
  userName: string;
  createTime: string;
  createTimeFmt: string;
  provinceName: string;
  cityName: string;
  districtName: string;
  authorName: string;
  companyName: string;
  isPublish?: boolean;
  isConfirm?: boolean;
  isStored?: boolean;
  storeTime?: string;
  reviewFile?: string;
}

export class ManuscriptInfoModel {
  id: number;
  title: string;
  keywords: string;
  subject: string;
  result: string;
  category: number;
  categoryName?: string;
  file: string;
  fileName?: string;
  fileFullPath?: string;
  isSelf: boolean;
  isPublished: boolean;
  periodicalCategory: number;
  periodicalCategoryName?: string;
  periodicalSummary?: string;
  userId: number;
  userName?: string;
  editUserId: number;
  editUserName?: string;
  createTime: string;

  constructor() {
    this.isSelf = true;
    this.title = this.keywords = this.subject = this.result = this.periodicalSummary = '';
  }

}


export class ManuscriptReviewModel {
  id: number;
  manuscriptId: number;
  status: ManuscriptStatusEnum;
  file?: string;
  fileName?: string;
  fileFullPath?: string;
  expire?: string;
  userId: number;
  createTime?: string;

  pub?: ManuscriptPublishModel;

}

export class ManuscriptAuthorModel {
  manuscriptId: number;
  province: number;
  provinceName?: string;
  city: number;
  cityName?: string;
  district: number;
  districtName?: string;
  name: string;
  tel: string;
  email: string;
  companyName: string;
  companyAddress: string;
  companyZipCode: string;

  constructor() {
    this.name = this.tel = this.email = this.companyName = this.companyAddress = this.companyZipCode = '';
  }
}


export class ManuscriptPublishModel {
  manuscriptId: number;
  year?: number;
  term?: number;
  userId: number;
  createTime?: string;
}
