import dotenv from "dotenv";
dotenv.config();

import { VideoProcessorApp } from "./app/VideoProcessorApp.js";

const app = new VideoProcessorApp();
app.run();
