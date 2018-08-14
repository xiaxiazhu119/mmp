import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {MatButtonModule, MatIconModule, MatMenuModule, MatLineModule, MatListModule, MatTooltipModule} from '@angular/material';

import {CmsSidebarNavItemComponent} from './sidebar-nav-item.component';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    MatButtonModule, MatIconModule, MatMenuModule, MatLineModule, MatListModule, MatTooltipModule
  ],
  declarations: [CmsSidebarNavItemComponent],
  exports: [CmsSidebarNavItemComponent]
})
export class CmsSidebarNavItemModule {
}
