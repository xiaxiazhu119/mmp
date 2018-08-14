import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WebHomeDefaultComponent} from './web-home-default.component';

const routes: Routes = [
  {path: '', component: WebHomeDefaultComponent}
];

export const WebHomeDefaultRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
