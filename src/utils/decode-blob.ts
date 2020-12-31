import { BlobResponse } from "../models";

export const decodeBlob = (response: BlobResponse): Promise<string> => {
  return Promise.resolve(Buffer.from(response.content, response.encoding as any).toString())
}
