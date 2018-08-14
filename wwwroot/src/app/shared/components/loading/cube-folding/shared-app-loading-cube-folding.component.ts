import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-loading-cube-folding',
  template: `
    <div class="sk-folding-cube">
      <div class="sk-cube1 sk-cube"></div>
      <div class="sk-cube2 sk-cube"></div>
      <div class="sk-cube4 sk-cube"></div>
      <div class="sk-cube3 sk-cube"></div>
    </div>`,
  styleUrls: ['./shared-app-loading-cube-folding.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SharedAppLoadingCubeFoldingComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
