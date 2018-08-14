import { Component, Input, Output, OnChanges, OnInit, SimpleChange, ViewEncapsulation, EventEmitter } from '@angular/core';

import { CommonService } from '@app/service/common';
import { PassportService, AppRoutingService } from '@app/service/app';
import { AppNavItem, User } from '@app/models';
import { PermissionGroupEnum } from '@app/enums';

@Component({
  selector: 'app-cms-sidebar-nav',
  templateUrl: './cms-sidebar-nav.component.html',
  styleUrls: ['./cms-sidebar-nav.component.scss', './cms-sidebar-nav.component.theme.scss'],
  providers: [AppRoutingService],
  encapsulation: ViewEncapsulation.None
})
export class CmsSidebarNavComponent implements OnInit, OnChanges {

  @Input()
  routeModuleId: string;

  appSidebarNavList: AppNavItem[] = [];

  activatedNav: AppNavItem = new AppNavItem();

  private appRouteConfig: any;
  private user: User = new User();

  constructor(private commonService: CommonService,
    private passportService: PassportService,
    private appRoutingService: AppRoutingService) {
    this.user = passportService.getUserCookie();
    this.appRouteConfig = appRoutingService.getRouteConfig();
  }

  ngOnInit(): void {
    this.initAppSidebarNavList();
    this.initActiveNav();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.initActiveNav();
  }

  onActivate(e: any): void {
    // console.log(e);
    // this.initActiveNav(e);
    // this.appSidebarNavList.map(navItem => {
    //   navItem.active = navItem.module === e.module;
    // });

    // this.activatedNav = e;

    this.goTo(e);

  }

  goTo(navItem: AppNavItem): void {
    setTimeout(() => {
      const ts = (new Date()).getTime();
      // this.commonService.routerNavigate(navItem.link, { ts: ts });
      this.commonService.routerNavigate(navItem.link);
    }, 300);
  }

  private initAppSidebarNavList(): void {

    const modules = this.appRouteConfig.modules.cms.modules;

    //#region home dashboard
    const dashboardModule = modules.home.modules.dashboard;

    const dashboardNav: AppNavItem = {
      id: dashboardModule.id,
      title: dashboardModule.documentTitle,
      toolTipTitle: dashboardModule.toolTipTitle,
      link: dashboardModule.link,
      icon: dashboardModule.icon
    };

    this.appSidebarNavList.push(dashboardNav);
    //#endregion

    //#region manuscript
    const manuscriptModule = modules.manuscript.modules.list;
    const _mddts = manuscriptModule.documentTitle.split(',');
    const _mdtts = manuscriptModule.toolTipTitle.split(',');
    const _i = this.user.permissionGroup === PermissionGroupEnum.SA ? 1 : 0;

    const manuscriptNav: AppNavItem = {
      id: manuscriptModule.id,
      title: _mddts[_i],
      toolTipTitle: _mdtts[_i],
      link: manuscriptModule.link,
      icon: manuscriptModule.icon
    };

    this.appSidebarNavList.push(manuscriptNav);
    //#endregion

    //#region magazine
    const magazineModule = modules.magazine.modules.list;

    const magazineNav: AppNavItem = {
      id: magazineModule.id,
      title: magazineModule.documentTitle,
      toolTipTitle: magazineModule.toolTipTitle,
      link: magazineModule.link,
      icon: magazineModule.icon
    };

    this.appSidebarNavList.push(magazineNav);
    //#endregion

    //#region announcement
    const announcementModule = modules.announcement.modules.list;

    const announcementNav: AppNavItem = {
      id: announcementModule.id,
      title: announcementModule.documentTitle,
      toolTipTitle: announcementModule.toolTipTitle,
      link: announcementModule.link,
      icon: announcementModule.icon
    };

    this.appSidebarNavList.push(announcementNav);
    //#endregion

    //#region candidate

    if (this.user.permissionGroup !== PermissionGroupEnum.Teacher) {
      const candidateModule = modules.candidate.modules.list;

      const candidateNav: AppNavItem = {
        id: candidateModule.id,
        title: candidateModule.documentTitle,
        toolTipTitle: candidateModule.toolTipTitle,
        link: candidateModule.link,
        icon: candidateModule.icon
      };

      this.appSidebarNavList.push(candidateNav);
    }
    //#endregion



    /*
    if (this.user.permissionGroup === PermissionGroupEnum.SA) {
      const infoDataNavCfg = modules.info.modules.data.nav;
      const infoDataNavDefaultModule = modules.info.modules.data.modules[infoDataNavCfg.defaultModule];

      const infoDataNav: AppNavItem = {
        id: infoDataNavCfg.id,
        module: infoDataNavCfg.id,
        title: infoDataNavDefaultModule.documentTitle,
        toolTipTitle: infoDataNavDefaultModule.toolTipTitle,
        link: infoDataNavDefaultModule.link,
        icon: infoDataNavCfg.icon
      };

      // this.appSidebarNavList.push(infoDataNav);
    }

    */

  }

  private initActiveNav(): void {
    // console.log(this.routeModuleId)
    this.appSidebarNavList.map(navItem => {
      navItem.active = navItem.id === this.routeModuleId;
    });
  }

}
