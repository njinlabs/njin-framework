import { HandlerContext } from "#types/handler_context";
import auth from "#utils/auth";
import { createId } from "@paralleldrive/cuid2";
import bodyParser from "body-parser";
import { Express, NextFunction, Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import apiOption from "#auths/api";

export default function kernel(app: Express) {
  const multerStorage = multer.diskStorage({
    destination: path.resolve(path.join(".tmp")),
    filename: (_req, _file, cb) => {
      cb(null, createId());
    },
  });
  const authInstance = auth();

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

  app.use((_req: Request, _res: Response, next: NextFunction) => {
    const context = app.get("context") as HandlerContext;

    authInstance.addProvider(apiOption(app));
    context.auth = authInstance;

    next();
  });
}
