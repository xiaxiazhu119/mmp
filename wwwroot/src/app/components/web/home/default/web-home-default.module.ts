import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WebHomeDefaultComponent } from './web-home-default.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [WebHomeDefaultComponent],
  exports: [WebHomeDefaultComponent]
})
export class WebHomeDefaultModule {
}
