import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule } from '@angular/material';

import { CmsTopNavComponent } from './cms-top-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule
  ],
  declarations: [CmsTopNavComponent],
  exports: [CmsTopNavComponent]
})
export class CmsTopNavModule {
}
