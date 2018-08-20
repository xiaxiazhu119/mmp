import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsMagazineInfoComponent } from './cms-magazine-info.component';

const routes: Routes = [
  {path: '', component: CmsMagazineInfoComponent}
];

export const CmsMagazineInfoRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
