import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import { CustomerRequestOptions } from '@app/models';
import { AppConfigService } from '../app/app.config.service';
import { AppCookieService } from './cookie.service';
import { AjaxBaseService, HttpMethod } from './ajax-base.service';
import { EventAnnounceService } from './event-announce.service';
import { UtilsService } from './utils.service';

@Injectable()
export class AjaxService {

  private protocol: string = window.location.protocol;
  private apiUrl = '';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  // private headers          = new Headers({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'});

  private httpOptions = {
    headers: this.headers
  };

  private rsp: any;
  private appConfig: any;

  // private basicOptions: any = {
  //   headers: this.headers,
  //   url: '',
  //   // method: RequestMethod.Post,
  //   search: null,
  //   body: null
  // };

  constructor(private http: HttpClient,
    private appConfigService: AppConfigService,
    private appCookieService: AppCookieService,
    private ajaxBaseService: AjaxBaseService,
    private eventAnnounceService: EventAnnounceService,
    private utilsService: UtilsService) {

    this.appConfig = appConfigService.getConfig();
    this.apiUrl = this.protocol + this.appConfig.domain + this.appConfig.apiPath;

    this.rsp = this.appConfig.response;

  }

  get(opts: CustomerRequestOptions, callback?: any, errCallback?: any): void {
    opts.method = HttpMethod.GET;
    this.request(opts, callback, errCallback);
  }

  post(opts: CustomerRequestOptions, callback?: any, errCallback?: any): void {
    opts.method = HttpMethod.POST;
    this.request(opts, callback, errCallback);
  }

  put(opts: CustomerRequestOptions, callback?: any, errCallback?: any): void {
    opts.method = HttpMethod.PUT;
    this.request(opts, callback, errCallback);
  }

  delete(opts: CustomerRequestOptions, callback?: any, errCallback?: any): void {
    opts.method = HttpMethod.DELETE;
    this.request(opts, callback, errCallback);
  }

  private request(opts: CustomerRequestOptions, callback?: any, errCallback?: any): void {

    const tokenIdCookie = this.getCookieTokenId();
    const customAuthHeaderKey = this.appConfig.apis.customHeaders.auth;
    this.httpOptions.headers = this.httpOptions.headers.set(customAuthHeaderKey, tokenIdCookie);

    let body: any;
    let url = this.apiUrl + opts.api;
    if (typeof opts.data !== 'undefined') {
      const queryData = this.utilsService.encryptByAES(opts.data);
      if (opts.method === HttpMethod.GET) {
        url += '?1=1&data=' + queryData;
      } else {
        body = JSON.stringify({ data: queryData });
      }
    }

    this.ajaxBaseService
      .request(opts.method, url, body, this.httpOptions)
      .subscribe(data => {

        if (data === null || data === undefined || typeof (data.code) === 'undefined' || Number(data.code) < 0) {
          this.eventAnnounce(Number(data.code), data.msg, errCallback);
          return;
        }


        if (callback) {
          callback(data);
        }
      },
        err => {
          this.eventAnnounce(this.rsp.RSP500.code, this.rsp.RSP500.desc, errCallback);
          // console.log(err);
        });


  }

  private eventAnnounce(code: any, desc: string, callback?: any): void {
    this.eventAnnounceService.confirmEvent({
      code: code,
      desc: desc,
      callback: callback
    });
  }

  private getCookieTokenId(): string {
    const userCookie: any = this.appCookieService.getObject(this.appConfig.cookies.keys.user);
    // console.log('userCookie:',userCookie, typeof userCookie)
    if (typeof userCookie === 'undefined') {
      return '';
    }
    return userCookie.tokenId;
  }


  private buildURLSearchParams(params: {}) {
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        urlSearchParams.set(key, params[key]);
      }
    }
    return urlSearchParams;
  }

}
