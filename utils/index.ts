import { store } from "@/store";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

export function decryptToken(token: string): string {
  let bytes = CryptoJS.AES.decrypt(
    token,
    process.env.NEXT_PUBLIC_ENC_KEY as unknown as string
  );
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

export function encryptToken(token: string): string {
  let ciphertext = CryptoJS.AES.encrypt(
    token,
    process.env.NEXT_PUBLIC_ENC_KEY as unknown as string
  ).toString();
  return ciphertext;
}

export function generateUUID() {
  return uuidv4();
}
