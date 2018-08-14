import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTooltipModule } from '@angular/material';

import { CmsSidebarNavComponent } from './cms-sidebar-nav.component';

import { CmsSidebarNavItemModule } from './nav-item/sidebar-nav-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    CmsSidebarNavItemModule
  ],
  declarations: [CmsSidebarNavComponent],
  exports: [CmsSidebarNavComponent]
})
export class CmsSidebarNavModule {
}
