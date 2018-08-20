import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsCandidateInfoComponent } from './cms-candidate-info.component';

const routes: Routes = [
  {path: '', component: CmsCandidateInfoComponent}
];

export const CmsCandidateInfoRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
