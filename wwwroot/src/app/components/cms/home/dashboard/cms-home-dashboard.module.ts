import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatSlideToggleModule, MatSnackBarModule } from '@angular/material';

// import { HomeDefaultRouting } from './www-home-default.routing';
import { CmsHomeDashboardComponent } from './cms-home-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatSlideToggleModule, MatSnackBarModule,
    // HomeDefaultRouting
  ],
  declarations: [CmsHomeDashboardComponent],
  exports: [CmsHomeDashboardComponent]
})
export class CmsHomeDashboardModule {
}
