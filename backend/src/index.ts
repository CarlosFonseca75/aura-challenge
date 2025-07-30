import express from "express";
import chalk from "chalk";

const app = express();
const PORT = process.env.PORT || 3000;

// 🚀 Start server.
app.listen(PORT, () => {
  console.log(chalk.green.bold("🚀 API started!"));
  console.log(chalk.cyan(`📍 Server running on: http://localhost:${PORT}`));
  console.log(chalk.magenta(`🏥 Health: http://localhost:${PORT}/health`));
  console.log(chalk.gray("Press Ctrl+C to stop the server."));
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

// 🛑 Shutting down.
process.on("SIGINT", () => {
  console.log(chalk.red("\n🍕 See you later! Shutting down API..."));
  process.exit(0);
});
