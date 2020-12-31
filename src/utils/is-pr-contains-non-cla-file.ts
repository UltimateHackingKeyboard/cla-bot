import { PrFiles } from '../models';

export const isPrContainsNonClaFile = (files: PrFiles): boolean => {
  return files.some(file => !file.filename.startsWith('cla/'))
}
