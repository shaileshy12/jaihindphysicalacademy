import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import { sanitizeBody } from "./middleware/sanitize.middleware.js";

import { errorMiddleware } from "./middleware/error.middleware.js";

import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import helmet from "helmet";

const URL = process.env.CLIENT_URL;

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(sanitizeBody);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Jai Hind Physical Academy API is running",
  });
});

// app.use("/api/v1/admin", adminRoutes);
// app.use("/api/v1/user", userRoutes);

// app.use(errorMiddleware);

export default app;
