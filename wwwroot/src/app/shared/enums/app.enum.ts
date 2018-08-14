export enum ManuscriptStatusEnum {
  Pending = 1,
  Return = 2,
  Edited = 3,
  Refused = 4,
  Stored = 5,
  Published = 6
}


export enum PermissionGroupEnum {
  SA = 9999,
  Teacher = 1,
}

export class EnumClass {

  static getManuscriptStatusName(status: ManuscriptStatusEnum): string {

    switch (status) {
      case ManuscriptStatusEnum.Pending:
        return '待评审';
      case ManuscriptStatusEnum.Return:
        return '退回修改';
      case ManuscriptStatusEnum.Edited:
        return '完成修改';
      case ManuscriptStatusEnum.Refused:
        return '不予采用';
      case ManuscriptStatusEnum.Stored:
        return '已入库';
      case ManuscriptStatusEnum.Published:
        return '已刊登';
      default:
        return '-';
    }

  }

  static getManuscriptStatusList(): any {
    const list = [];

    for (const status in ManuscriptStatusEnum) {
      if (!isNaN(Number(status))) {
        const s = Number(status);
        // console.log(this.getManuscriptStatusName(s))
        list.push({
          id: s,
          name: this.getManuscriptStatusName(s)
        });

      }
    }
    return list;
  }

}
