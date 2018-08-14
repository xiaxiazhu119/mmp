import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedAppLoadingCubeGridComponent} from './shared-app-loading-cube-grid.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedAppLoadingCubeGridComponent],
  exports: [SharedAppLoadingCubeGridComponent]
})
export class SharedAppLoadingCubeGridModule {
}
