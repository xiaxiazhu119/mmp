import { Injectable, Pipe, PipeTransform, ComponentFactoryResolver, Inject, ReflectiveInjector, Component, Type, ComponentFactory, ComponentRef } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { ActivatedRoute, Params, Router, NavigationExtras, UrlSegmentGroup, UrlTree, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UtilsService } from './utils.service';
import { EventAnnounceService } from './event-announce.service';

@Injectable()
export class CommonService {

  constructor(private location: Location,
    private locationStrategy: LocationStrategy,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private componentFactoryResolver: ComponentFactoryResolver,
    private eventAnnounceService: EventAnnounceService,
    private utilsService: UtilsService) {

  }

  getActivatedRoute(): ActivatedRoute {
    return this.activatedRoute;
  }

  getLocation(): Location {
    return this.location;
  }

  getLocationStrategy(): LocationStrategy {
    return this.locationStrategy;
  }

  getLocationPath(): string {
    return this.location.path(true);
  }

  getEncodeLocationPath(): string {
    return encodeURIComponent(this.getLocationPath());
  }

  getParam(key: string): string {
    let param: string;
    this.activatedRoute.params
      .subscribe(params => {
        param = params[key];
      });
    return param;
  }

  getParams(): any {
    let _params: any;
    this.activatedRoute.params
      .subscribe(params => {
        _params = params;
      });
    return _params;
  }

  getQueryParam(key: string): string {
    let queryParam: string;
    this.activatedRoute.queryParams
      .subscribe(params => {
        queryParam = params[key] || '';
      });
    return queryParam;
  }

  getQueryParams(): any {
    let queryParams: any;
    this.activatedRoute.queryParams
      .subscribe(params => {
        queryParams = params;
      });
    return queryParams;
  }

  getObservableParams(): Observable<any> {
    return this.activatedRoute.params;
  }

  getObservableQueryParams(): Observable<any> {
    return this.activatedRoute.queryParams;
  }

  getRefer(referParam?: string): string {
    let refer: string;
    referParam = typeof referParam === 'undefined' ? 'refer' : referParam;
    this.activatedRoute.queryParams
      .subscribe(params => {
        refer = params[referParam];
      });
    return refer;
  }

  routerNavigate(commands: any, queryParams?: any): void {
    const route: any[] = typeof commands === 'string' ? [commands] : commands;
    queryParams = queryParams || {};
    // console.log(this.router,route)
    this.router.navigate(route, { queryParams: queryParams });
  }

  routerNavigateWithRefer(commands: any[]): void {
    const refer = this.getLocationPath();
    this.router.navigate(commands, { queryParams: { refer: refer } });
  }

  goBack(interval = 0): void {
    setTimeout(() => {
      this.location.back();
    }, interval);
  }

  getAttachmentPath(attachment: string): string {
    if (typeof attachment === 'string') {
      return attachment;
    }
    return '';
  }

  getAttachmentFileName(path: string): string {
    return path.substring(path.lastIndexOf('/') + 1);
  }

  componentLoaded(interval: number = 500): void {
    this.eventAnnounceService.confirmEvent({ code: 0x999999, interval: interval });
  }

  getDecryptedQueryParam(paramKey: string = 'p'): Observable<any> {

    const queryParam = this.getQueryParam(paramKey);
    return this.getDecryptedValue(queryParam);
  }

  getDecryptedParam(paramKey: string = 'id'): Observable<any> {

    const param = this.getParam(paramKey);
    return this.getDecryptedValue(param, false);
  }

  getDecryptedValue(v: string, useJson = true): Observable<any> {

    if (v === '') {
      return of('');
    }

    const getDecryptedValue = this.utilsService.decryptByAES(v);
    if (getDecryptedValue === '') {
      return of('');
    }

    return of(useJson ? (JSON.parse(getDecryptedValue)) : (getDecryptedValue + ''));

  }

}
