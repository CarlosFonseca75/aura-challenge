import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

// ⚙️ Load env.
dotenv.config();

import { AppDataSource } from "./data-source";

const app = express();
const PORT = process.env.PORT || 3000;

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

// 🎯 Main route.
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the this amazing API! 🎉",
    version: "1.0.0",
    endpoints: {},
    timestamp: new Date(),
  });
});

// 🎯 Route for health check.
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API working correctly! 🚀",
    status: "healthy",
    timestamp: new Date(),
  });
});

AppDataSource.initialize()
  .then(() => {
    // 🚀 Start server.
    app.listen(PORT, () => {
      console.log(chalk.green.bold("🚀 API started!"));
      console.log(chalk.cyan(`📍 Server running on: http://localhost:${PORT}`));
      console.log(chalk.magenta(`🏥 Health: http://localhost:${PORT}/health`));
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
