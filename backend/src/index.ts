import express from "express";
import chalk from "chalk";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import env from "./config/env";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import errorHandler from "./middlewares/errorHandler";
import { Dayjs } from "./utils/date";
import { AppDataSource } from "./data-source";

const app = express();
const PORT = env.PORT || 3000;

// 🛡️ Security middleware.
app.use(helmet());

// 🌐 Cors.
app.use(cors());

// 📝 Logging.
app.use(
  morgan((tokens, req, res) => {
    const method = tokens.method(req, res);
    const url = tokens.url(req, res);
    const status = tokens.status(req, res);
    const responseTime = tokens["response-time"](req, res);

    let color = chalk.green;

    if (status && parseInt(status) >= 400) color = chalk.red;
    if (status && parseInt(status) >= 300) color = chalk.yellow;

    return color(`${method} ${url} ${status} ${responseTime}ms`);
  })
);

// 📦 Parse JSON.
app.use(express.json());

// 🎯 Main route.
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to this amazing API! 🎉",
    version: "1.0.0",
    endpoints: {},
    timestamp: Dayjs.nowUtc(),
  });
});

// 🎯 API Routes.
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// 🎯 Route for health check.
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API working correctly! 🚀",
    status: "healthy",
    timestamp: Dayjs.nowUtc(),
  });
});

// ⚠️ Global error handler.
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    // 🚀 Start server.
    app.listen(PORT, () => {
      console.log(chalk.green.bold("🚀 API started!"));
      console.log(chalk.cyan(`📍 Server running on: http://localhost:${PORT}`));
      console.log(chalk.magenta(`🏥 Health: http://localhost:${PORT}/health`));
      console.log(chalk.blue(`💻 Users: http://localhost:${PORT}/api/users`));
      console.log(chalk.blue(`🔐 Auth: http://localhost:${PORT}/api/auth`));
      console.log(chalk.gray("Press Ctrl+C to stop the server."));
    });
  })
  .catch((error) => {
    console.log(chalk.red.bold("⚠️ Error connecting to DB:", error));
  });

// 🛑 Shutting down.
process.on("SIGINT", () => {
  console.log(chalk.red("\n👋 See you later! Shutting down API..."));
  process.exit(0);
});
