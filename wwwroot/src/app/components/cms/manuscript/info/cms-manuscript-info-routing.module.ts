import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsManuscriptInfoComponent } from './cms-manuscript-info.component';

const routes: Routes = [
  {path: '', component: CmsManuscriptInfoComponent}
];

export const CmsManuscriptInfoRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
