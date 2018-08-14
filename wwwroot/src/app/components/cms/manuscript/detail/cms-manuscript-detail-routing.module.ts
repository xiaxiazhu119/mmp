import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsManuscriptDetailComponent } from './cms-manuscript-detail.component';

const routes: Routes = [
  {path: '', component: CmsManuscriptDetailComponent}
];

export const CmsManuscriptDetailRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
