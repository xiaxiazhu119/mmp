import { Injectable } from '@angular/core';

const cryptoJS = require('crypto-js/core');
const AES = require('crypto-js/aes');
// const SHA256 = require('crypto-js/sha256');
const MD5 = require('crypto-js/md5');
const ENC_BASE64 = require('crypto-js/enc-base64');
const NoPadding = require('crypto-js/pad-nopadding');
const ZeroPadding = require('crypto-js/pad-zeropadding');

@Injectable()
export class CryptoJsService {

  private KEY = '12345678900000001234567890000000'; // 32
  private IV = '1234567890000000';                 // 16

  constructor() {

    // console.log(SHA256('Message'));
  }

  // getSHA256(value: any): string {
  //   return SHA256(value);
  // }

  getMD5(value: string, upper: boolean = true): string {
    let v: string = MD5(value).toString();
    if (upper) {
      v = v.toUpperCase();
    }
    return v;
  }

  encryptByAES(value: any): string {
    const key = cryptoJS.enc.Utf8.parse(this.KEY),
      iv = cryptoJS.enc.Utf8.parse(this.IV);

    value = cryptoJS.enc.Utf8.parse(value);

    const buff = {
      iv: iv,
      mode: cryptoJS.mode.CBC,
      // padding: cryptoJS.pad.Pkcs7,
    };

    const encrypted = AES.encrypt(value, key, buff);

    // console.log('abc:', value, buff, encrypted);

    return encrypted.ciphertext.toString().toUpperCase();
    // return AES.encrypt(value, this.key, buff).toString();
  }

  decryptByAES(value: any): string {
    const key = cryptoJS.enc.Utf8.parse(this.KEY),
      iv = cryptoJS.enc.Utf8.parse(this.IV),
      encryptedHexStr = cryptoJS.enc.Hex.parse(value),
      srcs = cryptoJS.enc.Base64.stringify(encryptedHexStr);

    const decrypt = cryptoJS.AES.decrypt(srcs, key, {
      iv: iv,
      mode: cryptoJS.mode.CBC,
      // padding: cryptoJS.pad.Pkcs7,
    });

    const decryptedStr = decrypt.toString(cryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }

}
