import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsMagazineListComponent } from './cms-magazine-list.component';

const routes: Routes = [
  {path: '', component: CmsMagazineListComponent}
];

export const CmsMagazineListRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
