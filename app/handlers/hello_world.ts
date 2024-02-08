import { HandlerContext } from "#types/handler_context";
import { Express, Handler, Request, Response } from "express";

export default function helloWorld(app: Express): Handler {
  return async (req: Request, res: Response) => {
    const context = app.get("context") as HandlerContext;

    return res.send("Hello World");
  };
}
