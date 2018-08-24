import { EnumClass } from '@app/enums';
import { Injectable } from '@angular/core';

import '@app/interfaces';

import { CustomerRequestOptions, User, ManuscriptInfoModel, ManuscriptAuthorModel, ManuscriptListModel, ManuscriptReviewModel, UserProfile } from '@app/models';

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

  transferUserProfileModel(data: any): UserProfile {
    return {
      userId: data['user_id'],
      name: data['name'],
      mobile: data['mobile'],
      email: data['email'],
      province: data['province'],
      provinceName: data['province_name'],
      city: data['city'],
      cityName: data['city_name'],
      district: data['district'],
      districtName: data['district_name'],
      companyName: data['company_name'],
      companyAddress: data['company_address'],
      companyZipCode: data['company_zip_code'],
      idCard: data['id_card'],
      avatar: data['avatar'],
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
        isPublish: d['publish_id'] > 0,
        isConfirm: d['confirm_id'] > 0,
        isStored: d['store_id'] > 0,
        storeTime: d['store_time'] ? (new Date(d['store_time'])).format('yyyy-MM-dd') : '-',
        reviewFile: d['review_file']
      });
    });
    return list;
  }

  transferManuscriptInfoModel(data: any): ManuscriptInfoModel {
    return {
      id: data['id'],
      title: data['title'],
      keywords: data['keywords'],
      subject: data['subject'],
      result: data['result'],
      category: data['category'],
      categoryName: data['category_name'],
      file: data['file'],
      userId: data['user_id'],
      editUserId: data['edit_user_id'],
      userName: data['user_name'],
      createTime: (new Date(data['create_time'])).format('yyyy-MM-dd'),
      isPublished: data['is_published'],
      isSelf: data['is_self'],
      periodicalCategory: data['periodical_category'],
      periodicalCategoryName: data['periodical_category_name'],
      periodicalSummary: data['periodical_summary']
    };
  }

  transferManuscriptAuthorModel(data: any): ManuscriptAuthorModel {
    return {
      manuscriptId: data['manuscript_id'],
      province: data['province'],
      city: data['city'],
      district: data['district'],
      name: data['name'],
      tel: data['tel'],
      email: data['email'],
      companyName: data['company_name'],
      companyAddress: data['company_address'],
      companyZipCode: data['company_zip_code'],
    };
  }

  transferManuscriptReviewModel(data: any): ManuscriptReviewModel {
    return {
      id: data['id'],
      manuscriptId: data['manuscript_id'],
      status: data['status'],
      file: data['file'],
      expire: data['expire'],
      userId: data['user_id'],
      createTime: (new Date(data['create_time'])).format('yyyy-MM-dd'),
    };
  }


}
