import { Component, OnChanges, OnInit, SimpleChange, Input, Output, EventEmitter } from '@angular/core';

import '@app/interfaces';

import { AppService, AreaService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService } from '@app/service/common';


@Component({
  selector: 'app-area',
  templateUrl: './shared-app-area.component.html',
  styleUrls: ['./shared-app-area.component.scss', './shared-app-area.component.theme.scss'],
  providers: [CommonService, SnackBarService, AreaService, AppService]
})
export class SharedAppAreaComponent implements OnInit, OnChanges {

  @Input()
  disabled = false;
  @Input()
  area: any;

  @Output()
  areaChanged = new EventEmitter<any>();

  p = 0;
  c = 0;
  d = 0;

  provinceList: any[];
  cityList: any[];
  districtList: any[];

  private _defaultAreaConfig;

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private areaService: AreaService,
    private appService: AppService) {
    this._defaultAreaConfig = appService.getAppDefaultAreaConfig();

  }

  ngOnInit(): void {


  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    this.initProvinceList();
    // console.log('page changes:', changes)

  }


  //#region area


  onAreaChange(e: any, key: string, isInit = false, ...args): void {
    let __area, city, district, callback, id, keys, list, clearKeys;

    switch (key) {
      case 'province':
        this.cityList = this.districtList = [];

        list = this.provinceList;
        keys = ['province', 'provinceName', 'p'];
        clearKeys = ['city', 'cityName', 'district', 'districtName'];

        city = args[0] || 0;
        district = args[1] || 0;

        callback = (data: any) => {
          this.cityList = data;
          if (city) {
            this.onAreaChange(city, 'city', isInit, district);
          }
        };


        break;
      case 'city':


        this.districtList = [];

        list = this.cityList;
        keys = ['city', 'cityName', 'c'];
        clearKeys = ['district', 'districtName'];

        district = args[0] || 0;

        callback = (data: any) => {
          this.districtList = data;
          if (district) {
            this.onAreaChange(district, 'district', isInit);
          }
        };

        break;
      case 'district':

        list = this.districtList;
        keys = ['district', 'districtName', 'd'];

        break;
    }


    __area = this._filter(list, e);
    this.area[keys[0]] = id = this[keys[2]] = __area.id;
    this.area[keys[1]] = __area.name;
    if (clearKeys) {
      for (let i = 0, j = clearKeys.length; i < j; i++) {
        const k = clearKeys[i],
          t = typeof this.area[k];
        this.area[k] = t === 'number' ? 0 : '';
      }
    }

    if (callback) {

      this.getAreaList(id, callback);

    }

    // console.log(isInit)
    if (!isInit) {
      this.areaChanged.emit(this.area);
    }

  }

  //#endregion

  private _filter(list: any[], e: any): any {
    const id = e.value ? e.value : e;
    return list.filter((d: any) => d.id === id)[0];
  }

  //#region area

  private initProvinceList(): void {
    const c = (data: any) => {
      // console.log(data, typeof data);
      this.provinceList = data;
      // console.log(this.provinceList, this.area)
      if (this.area && this.area.province !== 0) {
        this.onAreaChange(this.area.province, 'province', true, this.area.city, this.area.district);
      }
    };
    this.getAreaList(this._defaultAreaConfig.countryCode, c);
  }

  private getAreaList(pid: number, callback: any): void {
    this.areaService
      .getList(pid, (rsp: any) => {
        if (rsp.data) {
          const d = this.utilsService.decryptByAES(rsp.data);
          if (d !== '') {
            const o = JSON.parse(d);
            callback(o);
          }
        }
      });
  }

  //#endregion
}
