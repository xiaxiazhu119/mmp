import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedAppLoadingCubeFoldingComponent} from './shared-app-loading-cube-folding.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedAppLoadingCubeFoldingComponent],
  exports: [SharedAppLoadingCubeFoldingComponent]
})
export class SharedAppLoadingCubeFoldingModule {
}
