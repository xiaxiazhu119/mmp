import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsCandidateDetailComponent } from './cms-candidate-detail.component';

const routes: Routes = [
  {path: '', component: CmsCandidateDetailComponent}
];

export const CmsCandidateDetailRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
