import { isEmpty } from "lodash";
import { ENCRYPT_KEY } from "services/config";
var CryptoJS = require("crypto-js");

export const CryptoUtils = {
  encrypt(word, key = ENCRYPT_KEY) {
    try {
      // let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
      let encJson = CryptoJS.AES.encrypt(word, key).toString();
      let encData = CryptoJS.enc.Utf8.parse(encJson).toString(CryptoJS.enc.Utf8)
      // let bytes = CryptoJS.AES.encrypt(word, key).toString();
      return encData
    } catch (error) {
      return { status: 0, error: error }
    }
  },
  decrypt(word, key = ENCRYPT_KEY) {
    try {
      
      let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
      let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
      return JSON.parse(bytes)
    } catch (error) {
      return { status: 0, error: error }
    }
  },

  // Methods for the encrypt and decrypt Using AES
  encryptUsingAES256(word, key_encrypt) {
    try {
      let key = CryptoJS.enc.Utf8.parse(key_encrypt);
      let iv = CryptoJS.enc.Utf8.parse(key_encrypt);
      var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(word)), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return CryptoJS.enc.Utf8.parse(encrypted).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return { status: 0, error: error }
    }
  },

  decryptUsingAES256(word, key_encrypt) {
    try {
      let key = CryptoJS.enc.Utf8.parse(key_encrypt);
      let iv = CryptoJS.enc.Utf8.parse(key_encrypt);
      var decrypted = CryptoJS.AES.decrypt(word, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      let dataDecrypted = decrypted.toString(CryptoJS.enc.Utf8);
      if (isEmpty(dataDecrypted)) {
        return { status: 0, error: 'Permission Denies' }
      } else {
        return decrypted.toString(CryptoJS.enc.Utf8);
      }
    } catch (error) {
      return { status: 0, error: error }
    }
    
  }
}
