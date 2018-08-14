import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsUserProfilePwdComponent } from './cms-user-profile-pwd.component';

const routes: Routes = [
  {path: '', component: CmsUserProfilePwdComponent}
];

export const CmsUserProfilePwdRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
