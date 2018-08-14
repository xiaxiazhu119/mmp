import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsMagazineDetailComponent } from './cms-magazine-detail.component';

const routes: Routes = [
  {path: '', component: CmsMagazineDetailComponent}
];

export const CmsMagazineDetailRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
