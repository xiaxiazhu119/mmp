import { BaseSearch } from './base.model';
import { AnnouncementTypeEnum } from '@app/enums';


export class AnnouncementSearchModel extends BaseSearch {
  scope?: string;
  type?: AnnouncementTypeEnum;
}

export class AnnouncementModel {
  id: number;
  title: string;
  type: AnnouncementTypeEnum;
  typeName: string;
  content?: string;
  scope?: string;
  userId: number;
  createTime: string;
}

