import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsAnnouncementListComponent } from './cms-announcement-list.component';

const routes: Routes = [
  {path: '', component: CmsAnnouncementListComponent}
];

export const CmsAnnouncementListRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
