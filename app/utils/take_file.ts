import { Request } from "express";
import { File } from "../types/file";
import fs from "fs";
import path from "path";

export default function takeFile(
  field: string,
  req: Request,
  options?: {
    mimeTypes?: string[];
    size?: number;
    multiple?: boolean;
  }
) {
  const files = (req.files as Express.Multer.File[])
    ?.filter((item) => item.fieldname === field)
    .filter((item) => {
      if (options?.mimeTypes) {
        if (!options?.mimeTypes.includes(item.mimetype)) {
          return false;
        }
      }

      if (options?.size && item.size > options.size) {
        return false;
      }

      return true;
    })
    .map((item) => {
      return {
        fileName: item.originalname,
        tmpPath: item.path,
        size: item.size,
        mimeType: item.mimetype,
        toBuffer: () => {
          const buffer = fs.readFileSync(item.path);
          return buffer;
        },
        save: () => {
          fs.copyFileSync(
            item.path,
            path.join(__dirname, "../../uploads", item.filename)
          );
        },
      } as File;
    });

  return options?.multiple ? files : files.shift();
}
