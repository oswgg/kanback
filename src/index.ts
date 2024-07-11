import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT;
app.get("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
