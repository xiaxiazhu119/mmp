export { };

declare global {

  interface Number {
    toCurrency(hasDecimal?: boolean): string;
    toFixedNumber(position: number): number;
    tryParse(defaultValue?: number): number;
  }

  interface Date {
    format(formatStr: string): string;

    addDays(days: number, useThis?: boolean): Date;

    isToday(): boolean;

    clone(): Date;

    isAnotherMonth(date: Date): boolean;

    isWeekend(): boolean;

    isSameDate(date: Date): boolean;
  }

  interface String {
    padLeft(length: number, char?: string): string;
    toInt(defaultValue?: number): number;
  }


}

// #region number prototype
Number.prototype.toCurrency = function (hasDecimal?: boolean): string {
  hasDecimal = typeof hasDecimal === 'undefined' ? true : hasDecimal;
  const v = this.toFixed(2) + '',
    arr = v.split('.'),
    i = arr[0].split('').reverse(),
    len = i.length;

  let is = '';

  for (let z = 0; z < len; z++) {
    is += i[z] + ((z + 1) % 3 === 0 && (z + 1) !== len ? ',' : '');
  }
  const _i = is.split('').reverse().join('');
  if (hasDecimal) {
    return _i + '.' + arr[1];
  }
  return _i;
};

Number.prototype.toFixedNumber = function (position: number): number {
  const offset = Math.pow(10, position);
  return Math.round(this * offset) / offset;
};

Number.prototype.tryParse = function (defaultValue = 0): number {
  const v = Number(this);
  if (isNaN(v)) {
    return defaultValue;
  }
  return v;
};

// #endregion

// #region date prototype
/*
 * e.g.
 * var d=new Date();
 * var str=d.Format("yyyy-MM-dd  hh:mm:ss");
 * console.log(str);
 */
Date.prototype.format = function (formatStr: string) {
  let str = formatStr;
  const week = ['日', '一', '二', '三', '四', '五', '六'];

  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
  const month = this.getMonth() + 1;
  str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
  str = str.replace(/M/g, month);

  str = str.replace(/w|W/g, week[this.getDay()]);

  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
  str = str.replace(/d|D/g, this.getDate());

  str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
  str = str.replace(/h|H/g, this.getHours());
  str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
  str = str.replace(/m/g, this.getMinutes());

  str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
  str = str.replace(/s|S/g, this.getSeconds());
  str = str.replace(/fff/g, this.getMilliseconds());

  return str;
};

Date.prototype.addDays = (days: number): Date => {
  if (!days) {
    return this;
  }
  // console.log(this);
  const date = this;
  date.setDate(date.getDate() + days);

  return date;
};

Date.prototype.isToday = (): boolean => {
  const today = new Date();
  return this.isSameDate(today);
};

Date.prototype.clone = (): Date => {
  return new Date(+this);
};

Date.prototype.isAnotherMonth = (date: Date): boolean => {
  return date && this.getMonth() !== date.getMonth();
};

Date.prototype.isWeekend = (): boolean => {
  return this.getDay() === 0 || this.getDay() === 6;
};

Date.prototype.isSameDate = (date: Date): boolean => {
  return date && this.getFullYear() === date.getFullYear() && this.getMonth() === date.getMonth() && this.getDate() === date.getDate();
};
// #endregion

// #region string prototype
String.prototype.padLeft = function (length: number, char?: string): string {
  char = char || '0';
  if (this.length < length) {
    return char + this;
  } else {
    return this;
  }

};
String.prototype.toInt = function (defaultValue?: number): number {
  defaultValue = defaultValue || 0;
  const v = parseInt(this, 10);
  return isNaN(v) ? defaultValue : v;
};
// #endregion
