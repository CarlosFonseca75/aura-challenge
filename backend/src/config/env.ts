import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

function getEnv(): EnvConfig {
  const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  if (!DB_HOST) throw new Error("DB_HOST is not set");
  if (!DB_PORT) throw new Error("DB_PORT is not set");
  if (!DB_USER) throw new Error("DB_USER is not set");
  if (!DB_PASSWORD) throw new Error("DB_PASSWORD is not set");
  if (!DB_NAME) throw new Error("DB_NAME is not set");

  return {
    PORT: Number(PORT) || 3000,
    DB_HOST,
    DB_PORT: Number(DB_PORT),
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
  };
}

export default getEnv();
