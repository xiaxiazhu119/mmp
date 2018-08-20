import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsAnnouncementInfoComponent } from './cms-announcement-info.component';

const routes: Routes = [
  {path: '', component: CmsAnnouncementInfoComponent}
];

export const CmsAnnouncementInfoRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
