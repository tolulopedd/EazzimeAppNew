import { adminLogout } from "@/api";
import secureLocalStorage from "react-secure-storage";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import AES from "crypto-js/aes";

// Function to add PKCS#7 padding
export const addPadding = (data, blockSize) => {
  const paddingLength = blockSize - (data.length % blockSize);
  const padding = Buffer.alloc(paddingLength, paddingLength);
  return Buffer.concat([Buffer.from(data), padding]);
};

// Function to remove PKCS#7 padding
export const removePadding = (data) => {
  const paddingLength = data[data.length - 1];
  return data.slice(0, data.length - paddingLength);
};

export const newEncrypter = (data) => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    data,
    process.env.NEXT_PUBLIC_SECRETKEY
  ).toString();
  return encryptedPassword;
};

export const newDecrypter = (encryptedPassword) => {
  if (encryptedPassword !== null) {
    const decryptedValue = CryptoJS.AES.decrypt(
      encryptedPassword,
      process.env.NEXT_PUBLIC_SECRETKEY
    ).toString(CryptoJS.enc.Utf8);
    return decryptedValue;
  } else {
    return null;
  }
};

export const userLogout = async () => {
  const userValues = secureLocalStorage.getItem("lunas");
  const loggedInUserEmail = userValues?.userDetails?.email;
  const decryptedIonzika =
    userValues !== null ? newDecrypter(userValues?.iozinka) : "";
  const payload = {
    username: loggedInUserEmail,
    password: decryptedIonzika,
  };
  try {
    const res = await adminLogout(payload);
    if (res.data.data.status) {
      secureLocalStorage.removeItem("lunas");
    }
  } catch (err) {
    console.log(err);
    secureLocalStorage.removeItem("lunas");
  }
};

export const iv = CryptoJS.lib.WordArray.random(128 / 8);

export const generateRandomKey = () => {
  return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
};

export const secondEncryption = (data, secretKey) => {
  const cipherText = CryptoJS.AES.encrypt(data, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  }).toString();

  return cipherText;
};

export const encryptAES = (dataToEncrypt, key, iv) => {
  const blockSize = 16;
  const paddedData = addPadding(dataToEncrypt, blockSize)
  const aes = crypto.createCipheriv("aes-128-cbc", key, iv);
  let encryptedData = aes?.update(paddedData, "utf-8", "hex");
  encryptedData += aes?.final("hex");
  return encryptedData;
};

export const decryptAES = (encryptedData, key, iv) => {
  if (
    encryptedData !== null ||
    encryptedData !== undefined ||
    encryptedData !== ""
  ) {
    const aes = crypto.createDecipheriv("aes-128-cbc", key, iv) || [];
    let decryptedData = aes?.update(encryptedData, "hex", "utf-8");
    decryptedData += aes?.final("utf-8");
    return removePadding(Buffer.from(decryptedData, 'utf-8')).toString();
  }
};

export const decryptData = (encryptedData, secretKey) => {
  const decryptPassword = AES.decrypt(encryptedData, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return decryptPassword;
};
