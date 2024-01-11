import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";
import { HealthInfo } from "src/users/health-info.entity";
import { User } from "src/users/user.entity";

const dbConfig = config.get("db");

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.post,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [User, HealthInfo],
  synchronize: true,
};
