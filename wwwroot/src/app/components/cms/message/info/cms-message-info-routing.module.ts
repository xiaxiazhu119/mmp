import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsMessageInfoComponent } from './cms-message-info.component';

const routes: Routes = [
  {path: '', component: CmsMessageInfoComponent}
];

export const CmsMessageInfoRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
