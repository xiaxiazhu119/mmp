import { Injectable } from '@angular/core';

import { AjaxService, CommonService } from '@app/service/common';
import { AppConfigService } from './app.config.service';

import { CustomerRequestOptions, User, UserProfile } from '@app/models';

@Injectable()
export class UserService {

  private apiModules: any;
  private path: any;

  constructor(private ajaxService: AjaxService,
    private appConfigService: AppConfigService,
    private commonService: CommonService) {

    const m: any = appConfigService.getConfig().apis.user;
    this.path = m.path;
    this.apiModules = m.modules;

  }

  signIn(user: User, callback?: any, errCallback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.signIn,
      data: user
    };

    return this.ajaxService.post(opts, callback, errCallback);

  }

  signUp(user: User, profile: UserProfile, callback?: any, errCallback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.signUp,
      data: {
        user: user,
        profile: profile
      }
    };

    return this.ajaxService.post(opts, callback, errCallback);

  }

  updatePwd(data: any, callback?: any, errCallback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.updatePwd,
      data: data
    };

    return this.ajaxService.post(opts, callback, errCallback);


  }


}
