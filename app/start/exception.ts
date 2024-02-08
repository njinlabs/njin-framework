import { Express, NextFunction, Request, Response } from "express";
import { errors } from "@vinejs/vine";
import { HandlerContext } from "#types/handler_context";

export default function exception(app: Express) {
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof errors.E_VALIDATION_ERROR) {
      return res.status(422).json(err.messages);
    }

    next(err);
  });

  app.use((err: Error, _req: Request, _res: Response, next: NextFunction) => {
    const { logger } = app.get("context") as HandlerContext;

    if (err) {
      logger.error(err);
    }

    next(err);
  });
}
