import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsAnnouncementEditComponent } from './cms-announcement-edit.component';

const routes: Routes = [
  {path: '', component: CmsAnnouncementEditComponent}
];

export const CmsAnnouncementEditRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
