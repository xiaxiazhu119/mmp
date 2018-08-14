import { Injectable } from '@angular/core';

import { AjaxService, CommonService } from '@app/service/common';
import { AppConfigService } from './app.config.service';

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

  list(sc: ManuscriptSearchModel, callback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.list,
      data: sc
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


}