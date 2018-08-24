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

  verifyProfile(profile: UserProfile): string {

    if (!profile.name) {
      return '请填写真实姓名';
    }

    if (!profile.mobile) {
      return '请填写手机号码';
    }

    if (!profile.email) {
      return '请填写电子邮件';
    }

    if (profile.province === 0) {
      return '请选择省/直辖市信息';
    }

    if (profile.city === 0) {
      return '请选择市信息';
    }

    if (profile.district === 0) {
      return '请选择区信息';
    }

    if (!profile.companyName) {
      return '请填写单位名称';
    }

    if (!profile.companyAddress) {
      return '请填写单位地址';
    }

    if (!profile.companyZipCode) {
      return '请填写单位邮编';
    }

    return '';

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
      api: this.path + this.apiModules.pwd,
      data: data
    };

    return this.ajaxService.post(opts, callback, errCallback);

  }

  getInfo(id: number, callback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.info.replace('{id}', id)
    };

    return this.ajaxService.get(opts, callback);

  }

  updateProfile(profile: UserProfile, callback?: any, errCallback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.profile,
      data: {
        profile: profile
      }
    };

    return this.ajaxService.post(opts, callback, errCallback);
  }


}
