import "reflect-metadata";
import { DataSource } from "typeorm";
import { Department } from "../../sarcocloud/src/entity/department.entity";
import { Organization } from "../../sarcocloud/src/entity/organization.entity";
import { User } from "../../sarcocloud/src/entity/user.entity";

export const QaDataSource = new DataSource({
  type: "postgres",
  host: process.env.QA_DB_HOST,
  port: parseInt(process.env.QA_DB_PORT || "5432"),
  username: process.env.QA_DB_USER,
  password: process.env.QA_DB_PASSWORD,
  database: process.env.QA_DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Organization, Department],
});
