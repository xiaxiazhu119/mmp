import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsMessageListComponent } from './cms-message-list.component';

const routes: Routes = [
  {path: '', component: CmsMessageListComponent}
];

export const CmsMessageListRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
