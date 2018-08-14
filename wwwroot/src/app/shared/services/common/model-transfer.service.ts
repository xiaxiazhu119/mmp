import { EnumClass } from '@app/enums';
import { Injectable } from '@angular/core';

import '@app/interfaces';

import { CustomerRequestOptions, User, ManuscriptInfoModel, ManuscriptAuthorModel, ManuscriptListModel } from '@app/models';

@Injectable()
export class ModelTransferService {


  constructor() {


  }

  transferUserModel(data: any): User {
    return {
      id: data.id,
      userName: data.user_name,
      tokenId: data.token_id,
      permissionGroup: data.permission_group,
    };
  }

  transferManuscriptListModel(data: any): ManuscriptListModel[] {
    const list: ManuscriptListModel[] = [];
    data.map((d: any) => {
      list.push({
        id: d['id'],
        title: d['title'],
        categoryName: d['category_name'],
        status: d['status'],
        statusName: EnumClass.getManuscriptStatusName(d['status']),
        userId: d['user_id'],
        userName: d['user_name'],
        createTime: d['create_time'],
        createTimeFmt: (new Date(d['create_time'])).format('yyyy-MM-dd'),
        provinceName: d['province_name'],
        cityName: d['city_name'],
        districtName: d['district_name'],
        authorName: d['author_name'],
        companyName: d['company_name'],
      });
    });
    return list;
  }


}
