import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsCandidateListComponent } from './cms-candidate-list.component';

const routes: Routes = [
  {path: '', component: CmsCandidateListComponent}
];

export const CmsCandidateListRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
