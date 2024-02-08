import { HandlerContext } from "#types/handler_context";
import { PrismaClient } from "@prisma/client";
import express, { Express } from "express";
import { pino } from "pino";

export default function server() {
  const app = express();
  const port = process.env.PORT || 3333;

  const logger = pino({
    transport: {
      target: "pino-pretty",
    },
  });

  const prisma = new PrismaClient();

  const context: HandlerContext = {
    logger,
    prisma,
  };

  app.set("context", context);

  return {
    listen: () => {
      app.listen(port, () => {
        logger.info("🚀🚀 Njin running on port " + port);
      });
    },
    handle: (handler: (app: Express) => void) => {
      handler(app);
    },
  };
}
