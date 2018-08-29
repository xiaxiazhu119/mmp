import { Injectable } from '@angular/core';

import { AjaxService, CommonService } from '@app/service/common';
import { AppConfigService } from './app.config.service';
import { CustomerRequestOptions, MessageSearchModel, MessageInfoModel } from '@app/models';
import { MessageTypeEnum, EnumClass, MessageScopeTypeEnum } from '@app/enums';

@Injectable()
export class MessageService {

  private msgTemplates: any;
  private apiModules: any;
  private path: any;

  constructor(private ajaxService: AjaxService,
    private appConfigService: AppConfigService,
    private commonService: CommonService) {

    const appConfig = appConfigService.getConfig();

    const m: any = appConfig.apis.message;
    this.path = m.path;
    this.apiModules = m.modules;

    this.msgTemplates = appConfig.templates.msg;

  }

  replaceMessage(tmpl: string, ...args): string {
    for (let i = 0, j = args.length; i < j; i++) {
      const placeHolder = '{' + i + '}';
      tmpl = tmpl.replace(placeHolder, args[i]);
    }
    return tmpl;
  }

  getMessageTemplates(): any {
    return this.msgTemplates;
  }

  sendReviewMessage(msg: string, scopeValue: any, callback?: any): any {
    const m: MessageInfoModel = {
      id: 0,
      title: msg,
      content: msg,
      type: MessageTypeEnum.Notice,
      typeName: EnumClass.getMessageTypeName(MessageTypeEnum.Notice),
      scopeType: MessageScopeTypeEnum.Single,
      scopeValue: scopeValue,
      userId: 0
    };
    // console.log(m)
    return this.edit(m, callback);
  }

  getInfo(id, callback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.info.replace('{id}', id),
    };

    return this.ajaxService.get(opts, callback);

  }


  edit(info: MessageInfoModel, callback?: any, errCallback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.edit,
      data: {
        info: info,
      }
    };

    return this.ajaxService.post(opts, callback, errCallback);

  }

  getList(sc: MessageSearchModel, callback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.list,
      data: sc
    };

    return this.ajaxService.get(opts, callback);

  }


  delete(id, callback?: any, errCallback?: any): any {

    const opts: CustomerRequestOptions = {
      api: this.path + this.apiModules.delete.replace('{id}', id)
    };

    return this.ajaxService.delete(opts, callback, errCallback);

  }



}
