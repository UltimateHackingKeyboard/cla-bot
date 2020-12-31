import { PrFiles } from "../models";

export const isPrContainsClaFile = (files: PrFiles): boolean => {
  return files.some(file => file.filename.startsWith('cla/'))
}
