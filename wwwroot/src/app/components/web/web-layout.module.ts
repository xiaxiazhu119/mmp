import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { WebLayoutRoutingModule } from './web-layout-routing.module';
import { WebLayoutComponent } from './web-layout.component';

import { WebHomeDefaultModule } from './home/default/web-home-default.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WebLayoutRoutingModule,
    WebHomeDefaultModule
  ],
  declarations: [WebLayoutComponent],
  exports: [WebLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebLayoutModule {
}

