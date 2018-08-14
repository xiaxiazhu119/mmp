import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CmsManuscriptReviewComponent } from './cms-manuscript-review.component';

const routes: Routes = [
  {path: '', component: CmsManuscriptReviewComponent}
];

export const CmsManuscriptReviewRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
