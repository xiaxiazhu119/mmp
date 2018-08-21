import { Injectable } from '@angular/core';

import { AjaxService, CommonService } from '@app/service/common';
import { AppConfigService } from './app.config.service';
import { ManuscriptStatusEnum } from '@app/enums';
import { CustomerRequestOptions, ManuscriptSearchModel, ManuscriptInfoModel, ManuscriptAuthorModel } from '@app/models';

@Injectable()
export class ManuscriptService {

  private apiModules: any;
  private path: any;

  constructor(private ajaxService: AjaxService,
    private appConfigService: AppConfigService,
    private commonService: CommonService) {

    const m: any = appConfigService.getConfig().apis.manuscript;
    this.path = m.path;
    this.apiModules = m.modules;

  }

  verifyManuscriptForm(info: ManuscriptInfoModel, author: ManuscriptAuthorModel): string {
    if (info.title === '') {
      return '请填写文章标题';
    }
    if (info.keywords === '') {
      return '请填写关键字';
    }
    if (typeof (info.category) === 'undefined') {
      return '请选择拟投栏目';
    }
    if (info.file === '') {
      return '请上传稿件文档';
    }
    if (typeof (info.isPublished) === 'undefined') {
      return '请选择是否已公开发表';
    }
    if (info.isPublished) {
      if (typeof (info.periodicalCategory) === 'undefined') {
        return '请选择期刊栏目';
      }
      if (info.periodicalSummary === '') {
        return '请填写期刊名、刊号等情况说明';
      }
    }
    if (!info.isSelf) {
      if (typeof (author.province) === 'undefined' || typeof (author.province) === 'undefined' || typeof (author.province) === 'undefined') {
        return '请选择地区';
      }
      if (author.name === '') {
        return '请填写作者姓名';

      }
      if (author.tel === '') {
        return '请填写作者电话';

      }
      if (author.email === '') {
        return '请填写作者邮箱';

      }
      if (author.companyName === '') {
        return '请填写作者单位';

      }
      if (author.companyAddress === '') {
        return '请填写作者单位地址';

      }
      if (author.companyZipCode === '') {
        return '请填写作者单位邮编';

      }
    }
    return '';
  }

  info(id, callback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.info.replace('{id}', id),
    };

    return this.ajaxService.get(opts, callback);

  }


  edit(info: ManuscriptInfoModel, author: ManuscriptAuthorModel, callback?: any, errCallback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.edit,
      data: {
        info: info,
        author: author
      }
    };

    return this.ajaxService.post(opts, callback, errCallback);

  }

  list(sc: ManuscriptSearchModel, callback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.list,
      data: sc
    };

    return this.ajaxService.get(opts, callback);

  }

  updateStatus(id: number, status: ManuscriptStatusEnum, callback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.updateStatus,
      data: {
        id: id,
        status: status
      }
    };

    return this.ajaxService.post(opts, callback);

  }


}
