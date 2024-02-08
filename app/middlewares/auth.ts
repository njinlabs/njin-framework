import { HandlerContext } from "#types/handler_context";
import { Request, Response, NextFunction, Express } from "express";

export default function auth(app: Express, provider: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    const { auth } = app.get("context") as HandlerContext;

    if (
      !(await auth!.validate(
        provider,
        (bearerToken || "").replace("Bearer ", "")
      ))
    ) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    next();
  };
}
