import { BaseSearch } from './base.model';
import { MessageTypeEnum, MessageScopeTypeEnum } from '@app/enums';


export class MessageSearchModel extends BaseSearch {
  scopeValue?: string;
  scopeType?: MessageScopeTypeEnum;
  scopeTypes?: string;
  type?: MessageTypeEnum;
  title?: string;
}

export class MessageInfoModel {
  id: number;
  title: string;
  type: MessageTypeEnum;
  typeName?: string;
  content?: string;
  scopeType: MessageScopeTypeEnum;
  scopeTypeName?: string;
  scopeValue?: string;
  userId: number;
  createTime?: string;

  constructor() {
    this.id = 0;
  }

}

