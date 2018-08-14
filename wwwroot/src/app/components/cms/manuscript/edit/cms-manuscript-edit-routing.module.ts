import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsManuscriptEditComponent } from './cms-manuscript-edit.component';

const routes: Routes = [
  {path: '', component: CmsManuscriptEditComponent}
];

export const CmsManuscriptEditRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
