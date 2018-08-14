import { ModuleWithProviders } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { appRouteConfig } from '@app/routing';

const modules = appRouteConfig.modules;

const _cmsModules = modules.cms;

import { CmsLayoutComponent } from './cms-layout.component';

import { CmsHomeDashboardComponent } from './home/dashboard/cms-home-dashboard.component';

//#region user
const userProfileModules = _cmsModules.modules.user.modules.profile.modules;
const userProfileRoutes: Route = {
  path: _cmsModules.modules.user.modules.profile.path,
  children: [
    {
      path: userProfileModules.info.path,
      loadChildren: userProfileModules.info.module
    },
    {
      path: userProfileModules.pwd.path,
      loadChildren: userProfileModules.pwd.module
    },
  ]
};
//#endregion

//#region manuscript
const manuscriptModules = _cmsModules.modules.manuscript.modules;
const manuscriptRoutes: Route = {
  path: _cmsModules.modules.manuscript.path,
  children: [
    {
      path: manuscriptModules.list.path,
      loadChildren: manuscriptModules.list.module
    },
    {
      path: manuscriptModules.detail.path,
      loadChildren: manuscriptModules.detail.module
    },
    {
      path: manuscriptModules.edit.path,
      loadChildren: manuscriptModules.edit.module
    },
    {
      path: manuscriptModules.review.path,
      loadChildren: manuscriptModules.review.module
    },
  ]
};
//#endregion

//#region magazine
const magazineModules = _cmsModules.modules.magazine.modules;
const magazineRoutes: Route = {
  path: _cmsModules.modules.magazine.path,
  children: [
    {
      path: magazineModules.list.path,
      loadChildren: magazineModules.list.module
    },
    {
      path: magazineModules.detail.path,
      loadChildren: magazineModules.detail.module
    },
  ]
};
//#endregion

//#region candidate
const candidateModules = _cmsModules.modules.candidate.modules;
const candidateRoutes: Route = {
  path: _cmsModules.modules.candidate.path,
  children: [
    {
      path: candidateModules.list.path,
      loadChildren: candidateModules.list.module
    },
    {
      path: candidateModules.detail.path,
      loadChildren: candidateModules.detail.module
    },
  ]
};
//#endregion

//#region announcement
const announcementModules = _cmsModules.modules.announcement.modules;
const announcementRoutes: Route = {
  path: _cmsModules.modules.announcement.path,
  children: [
    {
      path: announcementModules.list.path,
      loadChildren: announcementModules.list.module
    },
    {
      path: announcementModules.detail.path,
      loadChildren: announcementModules.detail.module
    },
    {
      path: announcementModules.edit.path,
      loadChildren: announcementModules.edit.module
    },
  ]
};
//#endregion

const routes: Routes = [
  {
    path: '',
    component: CmsLayoutComponent,
    children: [
      {
        path: '',
        component: CmsHomeDashboardComponent
      },
      {
        path: _cmsModules.modules.user.path,
        children: [
          userProfileRoutes
        ]
      },
      manuscriptRoutes,
      magazineRoutes,
      candidateRoutes,
      announcementRoutes,
    ]
  },
];

export const CmsLayoutRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
