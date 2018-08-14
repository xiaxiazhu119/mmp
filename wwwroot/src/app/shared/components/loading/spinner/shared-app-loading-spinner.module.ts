import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedAppLoadingSpinnerComponent} from './shared-app-loading-spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedAppLoadingSpinnerComponent],
  exports: [SharedAppLoadingSpinnerComponent]
})
export class SharedAppLoadingSpinnerModule {
}
