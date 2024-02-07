import { createId } from "@paralleldrive/cuid2";
import bodyParser from "body-parser";
import { Express, NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

export default function kernel(app: Express) {
  const multerStorage = multer.diskStorage({
    destination: path.join(__dirname, "../../.tmp"),
    filename: (_req, _file, cb) => {
      cb(null, createId());
    },
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(multer({ storage: multerStorage }).any());
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
      if (req.files?.length) {
        (req.files as Express.Multer.File[]).forEach((item) => {
          if (fs.existsSync(item.path)) {
            fs.unlinkSync(item.path);
          }
        });
      }
    });

    next();
  });
}
