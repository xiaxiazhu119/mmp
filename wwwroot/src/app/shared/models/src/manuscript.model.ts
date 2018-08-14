import { BaseSearch } from './base.model';
import { ManuscriptStatusEnum } from '@app/enums';


export class ManuscriptSearchModel extends BaseSearch {
  keyword?: string;
  category?: number;
  year?: number;
  term?: number;
  author?: string;
  company?: string;
  status?: number;
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
  isSelf: boolean;
  isPublished: boolean;
  periodicalCategory: number;
  periodicalCategoryName?: string;
  periodicalSummary: string;
  status: number;
  userId: number;
  userName?: string;
  createTime: string;

  constructor() {
    this.isSelf = true;
    this.title = this.keywords = this.subject = this.result = this.periodicalSummary = '';
    this.status = ManuscriptStatusEnum.Pending;
  }

}

export class ManuscriptAuthorModel {
  manuscriptId: number;
  province: number;
  provinceName: string;
  city: number;
  cityName: string;
  district: number;
  districtName: string;
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
