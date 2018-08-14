import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsAnnouncementDetailComponent } from './cms-announcement-detail.component';

const routes: Routes = [
  {path: '', component: CmsAnnouncementDetailComponent}
];

export const CmsAnnouncementDetailRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
