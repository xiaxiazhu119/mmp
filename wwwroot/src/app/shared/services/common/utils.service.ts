import { Injectable } from '@angular/core';
import { CryptoJsService } from './crypto-js.service';

@Injectable()
export class UtilsService {

  constructor(private cryptoJsService: CryptoJsService) {

  }

  encryptByMD5(value: string, upper: boolean = true): string {
    return this.cryptoJsService.getMD5(value, upper);
  }

  encryptByAES(value: any): string {
    value = typeof value === 'object' ? JSON.stringify(value) : value;
    return this.cryptoJsService.encryptByAES(value);
  }

  decryptByAES(value: any): string {
    return this.cryptoJsService.decryptByAES(value);
  }

  compareObj(o1: any, o2: any): boolean {
    let hasDiff = false;
    for (const prop in o1) {
      if (o1.hasOwnProperty(prop)) {
        // console.log(prop, this.project[prop], this.projectClone[prop], this.project[prop] !== this.projectClone[prop])
        if (o1[prop] !== o2[prop]) {
          hasDiff = true;
          break;
        }
      }
    }
    return hasDiff;
  }

  cloneObject(data: any, type = {}): any {
    return Object.assign(type, data);
  }

  getEnumStr(enums: any, key: number): string {
    return enums[key].toString().toLocaleLowerCase();
  }


}
