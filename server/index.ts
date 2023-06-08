import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import {authRouter} from "./routers/auth.router";

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION as string);
    app.listen(process.env.PORT, () => {
      console.log(`Server is working on PORT: ${process.env.PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
