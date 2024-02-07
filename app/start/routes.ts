import { Express } from "express";
import helloWorld from "../handlers/hello-world";

export default function routes(app: Express) {
  app.get("/", ...helloWorld(app));
}
