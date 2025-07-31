import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: number;
}

function getEnv(): EnvConfig {
  const {
    PORT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    JWT_SECRET,
    JWT_EXPIRES_IN,
  } = process.env;

  if (!DB_HOST) throw new Error("DB_HOST is not set");
  if (!DB_PORT) throw new Error("DB_PORT is not set");
  if (!DB_USER) throw new Error("DB_USER is not set");
  if (!DB_PASSWORD) throw new Error("DB_PASSWORD is not set");
  if (!DB_NAME) throw new Error("JWT_SECRET is not set");
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");
  if (!JWT_EXPIRES_IN) throw new Error("JWT_EXPIRES_IN is not set");

  return {
    PORT: Number(PORT) || 3000,
    DB_HOST,
    DB_PORT: Number(DB_PORT),
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    JWT_SECRET,
    JWT_EXPIRES_IN: Number(JWT_EXPIRES_IN),
  };
}

export default getEnv();
