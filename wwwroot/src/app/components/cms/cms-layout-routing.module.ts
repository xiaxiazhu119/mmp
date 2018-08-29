import { ModuleWithProviders } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { appRouteConfig } from '@app/routing';

const modules = appRouteConfig.modules;

const _cmsModules = modules.cms;

import { CmsLayoutComponent } from './cms-layout.component';

import { CmsHomeDashboardComponent } from './home/dashboard/cms-home-dashboard.component';

//#region user
const userModules = _cmsModules.modules.user.modules;
const userRoutes: Route = {
  path: _cmsModules.modules.user.path,
  children: [
    {
      path: userModules.profile.path,
      loadChildren: userModules.profile.module
    },
    {
      path: userModules.pwd.path,
      loadChildren: userModules.pwd.module
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
      path: manuscriptModules.info.path + manuscriptModules.info.params,
      loadChildren: manuscriptModules.info.module
    },
    {
      path: manuscriptModules.create.path,
      loadChildren: manuscriptModules.create.module
    },
    {
      path: manuscriptModules.edit.path + manuscriptModules.edit.params,
      loadChildren: manuscriptModules.edit.module
    },
    {
      path: manuscriptModules.review.path + manuscriptModules.review.params,
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
      path: magazineModules.info.path + magazineModules.info.params,
      loadChildren: magazineModules.info.module
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
      path: candidateModules.info.path + candidateModules.info.params,
      loadChildren: candidateModules.info.module
    },
  ]
};
//#endregion

//#region message
const messageModules = _cmsModules.modules.message.modules;
const messageRoutes: Route = {
  path: _cmsModules.modules.message.path,
  children: [
    {
      path: messageModules.list.path,
      loadChildren: messageModules.list.module
    },
    {
      path: messageModules.info.path + messageModules.info.params,
      loadChildren: messageModules.info.module
    },
    {
      path: messageModules.edit.path + messageModules.edit.params,
      loadChildren: messageModules.edit.module
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
      path: announcementModules.edit.path + announcementModules.edit.params,
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
      userRoutes,
      manuscriptRoutes,
      magazineRoutes,
      candidateRoutes,
      messageRoutes,
      announcementRoutes,
    ]
  },
];

export const CmsLayoutRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
