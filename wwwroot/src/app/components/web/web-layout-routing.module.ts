import { ModuleWithProviders } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';

import { appRouteConfig } from '@app/routing';

const modules = appRouteConfig.modules;

const _webModules = modules.web;

const _homeModules = _webModules.modules.home.modules;

import { WebLayoutComponent } from './web-layout.component';

import { WebHomeDefaultComponent } from './home/default/web-home-default.component';



const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      {
        path: '',
        component: WebHomeDefaultComponent
      },
    ]
  },
];

// console.log('routes:', routes)

export const WebLayoutRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
