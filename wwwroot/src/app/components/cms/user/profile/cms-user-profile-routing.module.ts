import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsUserProfileComponent } from './cms-user-profile.component';

const routes: Routes = [
  {path: '', component: CmsUserProfileComponent}
];

export const CmsUserProfileRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
