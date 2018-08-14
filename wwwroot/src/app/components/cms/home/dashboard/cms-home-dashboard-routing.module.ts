import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CmsHomeDashboardComponent} from './cms-home-dashboard.component';

const routes: Routes = [
  {path: '', component: CmsHomeDashboardComponent}
];

export const CmsHomeDashboardRouting: ModuleWithProviders = RouterModule.forChild(routes);
