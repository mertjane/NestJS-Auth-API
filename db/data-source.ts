import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres' /* process.env.POSTGRES_USER */,
  password: 'mysecretpassword' /* process.env.POSTGRES_PASSWORD */,
  database: 'auth' /* process.env.POSTGRES_DATABASE */,
  entities: ['dist/../**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
