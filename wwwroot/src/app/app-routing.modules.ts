import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route, Router } from '@angular/router';

import { appRouteConfig } from '@app/routing';

const modules = appRouteConfig.modules;

const _webModules = modules.web;
const _cmsModules = modules.cms;
const _passportModules = modules.passport;

const appRoutes: Routes = [
  { path: appRouteConfig._default.path, redirectTo: appRouteConfig._default.redirectTo, pathMatch: appRouteConfig._default.pathMatch },
  {
    path: _webModules.path,
    loadChildren: _webModules.module,
  }, {
    path: _cmsModules.path,
    loadChildren: _cmsModules.module,
  }, {
    path: _passportModules.path,
    loadChildren: _passportModules.module,
  },
];

// console.log('routes:', appRoutes);

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(appRoutes, {
    useHash: true,
    // enableTracing: true
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
