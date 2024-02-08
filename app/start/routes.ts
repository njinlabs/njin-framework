import helloWorld from "#handlers/hello_world";
import { Express } from "express";

export default function routes(app: Express) {
  app.get("/", helloWorld(app));
}
