import { NextFunction, Request, Response } from "express";
import server from "./app/start/server";
import { HandlerContext } from "./app/types/handler_context";

const njin = server();

njin.handle((app) => {
  app.use((err: Error, _req: Request, _res: Response, next: NextFunction) => {
    const { logger } = app.get("context") as HandlerContext;

    if (err) {
      logger.error(err);
    }

    next();
  });
});

njin.listen();
