import express, { Express } from "express";

export default function server(callback?: (app: Express) => void) {
  const app = express();
  const port = process.env.PORT || 3333;

  if (callback) callback(app);

  app.listen(port, () => {});
}
