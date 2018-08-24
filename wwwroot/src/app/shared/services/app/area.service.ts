import { Injectable } from '@angular/core';

import { AjaxService, CommonService } from '@app/service/common';
import { AppConfigService } from './app.config.service';

import { CustomerRequestOptions, KeyValuePair } from '@app/models';

@Injectable()
export class AreaService {

  private apiModules: any;
  private path: any;

  constructor(private ajaxService: AjaxService,
    private appConfigService: AppConfigService,
    private commonService: CommonService) {

    const m: any = appConfigService.getConfig().apis.area;
    this.path = m.path;
    this.apiModules = m.modules;

  }

  getList(pid: number, callback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.list.replace('{pid}', pid),
    };

    return this.ajaxService.get(opts, callback);

  }


}
