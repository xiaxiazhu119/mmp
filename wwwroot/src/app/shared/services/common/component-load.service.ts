import {ComponentFactoryResolver, Injectable} from '@angular/core';

@Injectable()
export class ComponentLoadService {


  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  loadComponent(target: any, _component: any, data: any, callback?: any): any {
    const factory = this.componentFactoryResolver.resolveComponentFactory(_component);

    const componentRef = target.createComponent(factory);

    componentRef.instance.data = data;
    // componentRef.instance.eventEmitter.subscribe((e: any) => callback(e));

    return componentRef;
  }

}
