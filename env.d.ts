declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGODB_URL: string;
      NODE_ENV: string;
      JWT_SECRET: string;
    }
  }
}

export {};
