import { NextFunction, Request, Response } from "express";
import server from "./app/start/server";
import { HandlerContext } from "./app/types/handler_context";
import routes from "./app/start/routes";

const njin = server();

njin.handle((app) => {
  routes(app);
});

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
