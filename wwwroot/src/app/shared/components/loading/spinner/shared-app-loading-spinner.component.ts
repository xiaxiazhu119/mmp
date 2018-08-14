import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="sk-spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>`,
  styleUrls: ['./shared-app-loading-spinner.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SharedAppLoadingSpinnerComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
