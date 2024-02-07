import bodyParser from "body-parser";
import { Express } from "express";

export default function kernel(app: Express) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
}
