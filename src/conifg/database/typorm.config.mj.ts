import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from "config";
import { HealthInfo } from "src/users/entities/health-info.entity";
import { User } from "src/users/entities/user.entity";
import * as TypeOrmNamingStrategies from "typeorm-naming-strategies";

const dbConfig = config.get("db");

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.DB_HOSTNAME || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.post,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_NAME || dbConfig.database,
  entities: [User, HealthInfo],
  synchronize: false,
  namingStrategy: new TypeOrmNamingStrategies.SnakeNamingStrategy(),
};
