import { AuthFunction } from "#utils/auth";
import { PrismaClient } from "@prisma/client";
import { Logger } from "pino";

export interface HandlerContext {
  logger: Logger;
  prisma: PrismaClient;
  auth?: AuthFunction;
}
