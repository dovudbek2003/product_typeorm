export interface IConfig {
  serverPort: number;
  jwtSecretKey: string;
  jwtExpiredIn: string;
  databaseUrl: string;
}
