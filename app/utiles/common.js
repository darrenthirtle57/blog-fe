import CryptoJS from "crypto-js";
const secretKey = "7y#Vw$2pZ!Kq^u@S";

export const getFromStorage = (key) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const encryptedValue = window.localStorage.getItem(key);
    if (encryptedValue) {
      const decryptedValue = CryptoJS.AES.decrypt(
        encryptedValue,
        secretKey
      ).toString(CryptoJS.enc.Utf8);
      return decryptedValue;
    }
  }
  return null;
};

export const removeToStorage = (key) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem(key);
  }
};

export const setToStorage = (key, value) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const encryptedValue = CryptoJS.AES.encrypt(value, secretKey).toString();
    window.localStorage.setItem(key, encryptedValue);
  }
};

export function formattedDate(date) {
  if (date) {
    const dateValue = new Date(date);
    const formattedDate = dateValue.toLocaleDateString("en-US");
    return formattedDate;
  }

  return null;
}
