import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CmsLayoutRoutingModule } from './cms-layout-routing.module';
import { CmsLayoutComponent } from './cms-layout.component';

import { CmsHomeDashboardModule } from './home/dashboard/cms-home-dashboard.module';

import { CmsSidebarNavModule } from './_nav/sidebar-nav/cms-sidebar-nav.module';
import { CmsTopNavModule } from './_nav/top-nav/cms-top-nav.module';

import { SharedAppLoadingCubeGridModule } from '@app/loading/CubeGrid';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedAppLoadingCubeGridModule,
    CmsSidebarNavModule, CmsTopNavModule,
    CmsLayoutRoutingModule,
    CmsHomeDashboardModule
  ],
  declarations: [CmsLayoutComponent],
  exports: [CmsLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CmsLayoutModule {
}

