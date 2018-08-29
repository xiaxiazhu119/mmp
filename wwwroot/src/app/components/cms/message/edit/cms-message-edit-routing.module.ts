import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsMessageEditComponent } from './cms-message-edit.component';

const routes: Routes = [
  {path: '', component: CmsMessageEditComponent}
];

export const CmsMessageEditRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
