import { Express, Handler, Request, Response } from "express";
import { HandlerContext } from "../types/handler_context";

export default function helloWorld(app: Express): Handler[] {
  const handler = async (req: Request, res: Response) => {
    const context = app.get("context") as HandlerContext;

    return res.send("Hello World!!!");
  };

  return [handler];
}
