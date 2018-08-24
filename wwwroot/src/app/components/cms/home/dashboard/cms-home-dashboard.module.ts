import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CmsHomeDashboardComponent } from './cms-home-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CmsHomeDashboardComponent],
  exports: [CmsHomeDashboardComponent]
})
export class CmsHomeDashboardModule {
}
