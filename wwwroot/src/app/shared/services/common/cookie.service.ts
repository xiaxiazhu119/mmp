import {Injectable} from '@angular/core';

import {CookieService, CookieOptions} from 'ngx-cookie';


@Injectable()
export class AppCookieService {

  private cookieKeyPrefix = 'my_ng_';

  constructor(private cookieService: CookieService) {
    // this.cookieKeyPrefix = 'a';
  }

  /**
   * @param {string} key Id to use for lookup.
   * @returns {string} Raw cookie value.
   */
  get(key: string): string {
    return this.cookieService.get(this.cookieKeyPrefix + key);
  }

  /**
   * @param {string} key Id to use for lookup.
   * @returns {Object} Deserialized cookie value.
   */
  getObject(key: string): Object {
    return this.cookieService.getObject(this.cookieKeyPrefix + key);
  }

  /**
   * @returns {Object} All cookies
   */
  getAll(): Object {
    return this.cookieService.getAll();
  }

  /**
   * @param {string} key Id for the `value`.
   * @param {string} value Raw value to be stored.
   * @param {CookieOptionsArgs} options (Optional) Options object.
   */
  put(key: string, value: string, options?: CookieOptions): void {
    this.cookieService.put(this.cookieKeyPrefix + key, value, options);
  }

  /**
   * @param {string} key Id for the `value`.
   * @param {Object} value Value to be stored.
   * @param {CookieOptionsArgs} options (Optional) Options object.
   */
  putObject(key: string, value: Object, options?: CookieOptions): void {
    this.cookieService.putObject(this.cookieKeyPrefix + key, value, options);
  }

  /**
   * @param {string} key Id of the key-value pair to delete.
   * @param {CookieOptionsArgs} options (Optional) Options object.
   */
  remove(key: string, options?: CookieOptions): void {
    this.cookieService.remove(this.cookieKeyPrefix + key, options);
  }

  removeAll(): void {
    this.cookieService.removeAll();
  }
}
