import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsUserProfileInfoComponent } from './cms-user-profile-info.component';

const routes: Routes = [
  {path: '', component: CmsUserProfileInfoComponent}
];

export const CmsUserProfileInfoRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
