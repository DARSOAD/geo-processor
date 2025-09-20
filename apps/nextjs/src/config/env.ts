import { z } from "zod";

const ClientEnv = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url(), 
});

const ServerEnv = z.object({
  API_BASE_URL: z.string().url(),             
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  API_TIMEOUT_MS: z.string().optional(),      
});

export const clientEnv = ClientEnv.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const serverEnv = ServerEnv.parse({
  API_BASE_URL: process.env.API_BASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  API_TIMEOUT_MS: process.env.API_TIMEOUT_MS,
});

export const API_TIMEOUT_MS = Number(serverEnv.API_TIMEOUT_MS ?? "8000");
