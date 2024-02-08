export interface File {
  fileName: string;
  mimeType: string;
  tmpPath: string;
  size: number;
  toBuffer: () => Buffer;
  save: () => void;
}
