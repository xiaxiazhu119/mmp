import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-loading-rotate',
  template: `
    <div class="sk-rotate"></div>`,
  styleUrls: ['./shared-app-loading-rotate.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SharedAppLoadingRotateComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
