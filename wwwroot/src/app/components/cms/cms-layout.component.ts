import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { AppCmsBaseComponent } from '@app/cmsBaseComponent';
import { CommonService, EventAnnounceService } from '@app/service/common';
import { AppService, AppConfigService, AppRoutingService, PassportService } from '@app/service/app';
import { DialogService } from '@app/service/ui';
import { PermissionGroupEnum } from '@app/enums';

import { User } from '@app/models';

@Component({
  selector: 'app-cms-layout',
  templateUrl: './cms-layout.component.html',
  styleUrls: ['./cms-layout.component.scss', './cms-layout.component.theme.scss'],
  providers: [AppService, AppRoutingService]
})
export class CmsLayoutComponent extends AppCmsBaseComponent implements OnInit, AfterViewInit {

  user: User;
  isSigned = false;

  appComponentLoading = true;
  appComponentLoaded = false;

  routeModuleId: string;

  private rsp: any;
  private routerEventSubscription: any;

  constructor(private eventAnnounceService: EventAnnounceService,
    private router: Router,
    private appConfigService: AppConfigService,
    private appRoutingService: AppRoutingService,
    private appService: AppService,
    private passportService: PassportService,
    private commonService: CommonService,
    private dialogService: DialogService) {
    super();

    // const _u: User = {
    //   id: 1,
    //   userName: 'xxx',
    //   name: 'xxx',
    //   tokenId: '17F8618ECBAC521F9D7E460B87E10EE4',
    //   permissionGroup: 1
    // };
    // this.passportService.putUserCookie(_u);

    this.user = this.passportService.getUserCookie();
    this.checkSigned();

    this.rsp = appConfigService.getConfig().response;

    this.passportService.onUserCookieChange().subscribe(
      u => {
        this.user = u;
        // console.log('uuuuuu:',u)
      }
    );

    // this.appService.onCurrentModuleChange().subscribe(cm => {
    //   this.currentModule = cm;
    //   console.log(this.currentModule)
    //   this.setDocumentTitle(this.currentModule.documentTitle);
    //   this.setPageTitle(this.currentModule.pageTitle);
    // });

    this.eventSubscribe();
    this.subscribeRouterEvent();

    this.hideComponentLoading();
  }

  ngOnInit(): void {
    // console.log('load web layout component complete');


  }

  ngAfterViewInit(): void {
  }



  onSign(e: any): void {
    this.checkSigned();
  }

  onSignOut(e: any): void {
    this.passportService.signOut();
  }


  private resize(): void {
    // console.log('document.body.offsetWidth:',document.body.scrollWidth)
    // this.commonService.setElementStyle('#app-main-container', 'width', (window.innerWidth - 200) + 'px');
    // this.commonService.setElementStyle('#app-main-container', 'width', (document.body.scrollWidth - 200) + 'px');
    // this.commonService.setElementStyle('#app-body-container', 'height', (window.innerHeight - 80) + 'px');
    // this._t++;
  }

  private checkSigned(): void {
    this.isSigned = this.passportService.checkSigned();
    if (!this.isSigned) {
      this.passportService.signOut();
    }
    // this.passportService.verifyAuthorization(this.commonService.getCurrentModuleAndPath());
  }

  private subscribeRouterEvent(): void {

    const onNavigationStart = (event: RouterEvent) => {
      this.showComponentLoading();
      // console.log('navigation start event:', event);
    };

    const onNavigationEnd = (event: RouterEvent) => {
      this.hideComponentLoading();

      if (this.router.url.indexOf('cms') === -1) {
        this.routerEventSubscription.unsubscribe();
        return;
      }

      let url = this.router.url;
      const questionMarkIndex = url.indexOf('?');

      if (questionMarkIndex !== -1) {
        url = url.substring(0, questionMarkIndex);
      }

      const routeModule = this.appRoutingService.getRouterModuleByUrl(url);
      this.routeModuleId = routeModule.id;

      let dt = routeModule.documentTitle,
        pt = routeModule.pageTitle;

      const hasComma = dt.indexOf(',') !== -1;
      if (hasComma) {
        let _i = 0;
        if (url.indexOf('edit') === -1) {
          _i = this.user.permissionGroup === PermissionGroupEnum.SA ? 1 : 0;
        }
        dt = dt.split(',')[_i];
        pt = pt.split(',')[_i];
      }

      this.setDocumentTitle(dt);
      this.setPageTitle(pt);

      // const path = this.commonService.getLocationPath();
      // console.log('navigation end event:', event, path);
    };

    this.routerEventSubscription = this.appRoutingService.subscribeRouterEvents(this.router, onNavigationStart, onNavigationEnd);

  }

  private eventSubscribe(): void {

    this.eventAnnounceService.eventConfirmed$.subscribe(
      param => {
        // console.log('param:', param);

        if (param.code === 0x999999 && this.appComponentLoading) {

          // setTimeout(() => {
          //   this.appComponentLoading = false;
          //   setTimeout(() => {
          //     this.appComponentLoaded = true;
          //   }, 100);
          // }, param.interval);

          // this.delayAppComponentLoading(param.interval);
          // return;
        }

        if (param.code < 0) {

          // this.commonService.componentLoaded();

          return;
        }


      });

  }

  private delayAppComponentLoading(interval: number = 0): void {
    this.appComponentLoading = false;

    // setTimeout(() => {
    //   this.appComponentLoading = false;
    //   setTimeout(() => {
    //     this.appComponentLoaded = true;
    //   }, 100);
    // }, interval);

  }

  private showComponentLoading(): void {
    this.appComponentLoading = true;
    this.appComponentLoaded = !this.appComponentLoading;
  }

  private hideComponentLoading(): void {
    setTimeout(() => {
      this.appComponentLoading = false;
      setTimeout(() => {
        this.appComponentLoaded = true;
      }, 200);
    }, 700);
  }


}


