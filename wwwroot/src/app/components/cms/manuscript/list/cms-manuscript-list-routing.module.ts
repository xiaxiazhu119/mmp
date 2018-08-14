import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsManuscriptListComponent } from './cms-manuscript-list.component';

const routes: Routes = [
  {path: '', component: CmsManuscriptListComponent}
];

export const CmsManuscriptListRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
