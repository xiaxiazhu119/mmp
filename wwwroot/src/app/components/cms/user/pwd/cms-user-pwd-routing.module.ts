import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsUserPwdComponent } from './cms-user-pwd.component';

const routes: Routes = [
  {path: '', component: CmsUserPwdComponent}
];

export const CmsUserPwdRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
