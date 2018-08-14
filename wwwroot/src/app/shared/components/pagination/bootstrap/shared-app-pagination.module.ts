import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {PaginationModule} from 'ngx-bootstrap/pagination';

import {SharedAppPaginationComponent} from './shared-app-pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  declarations: [SharedAppPaginationComponent],
  exports: [SharedAppPaginationComponent]
})
export class AppPaginationModule {
}
