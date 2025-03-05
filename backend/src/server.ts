import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import WeatherRoutes from "./routes/weatherRoutes";

// This will load variables from the .env file
dotenv.config();

const app: Express = express();

app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI as string, {
}).then(() => console.log("MongoDB Connected"))
  .catch(error => console.error("MongoDB Connection Error: ", error));

app.use("/api", WeatherRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
