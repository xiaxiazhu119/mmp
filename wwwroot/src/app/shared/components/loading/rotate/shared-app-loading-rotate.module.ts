import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedAppLoadingRotateComponent} from './shared-app-loading-rotate.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedAppLoadingRotateComponent],
  exports: [SharedAppLoadingRotateComponent]
})
export class SharedAppLoadingRotateModule {
}
