import { knexSnakeCaseMappers } from 'objection';
import { config } from './src/libs/config/config.ts'

const {
  DATABASE: database,
  USERNAME: username,
  PASSWORD: password,
  HOST: host,
  PORT: port,
  CLIENT: client,
  DEBUG: debug
} = config.DB;

const knexConfig = {
  client,
  connection: {
    user: username,
    port: parseInt(port as string, 10),
    host,
    database,
    password
  },
  migrations: {
    directory: './src/db/migrations',
    tableName: 'knex_migrations'
  },
  debug,
  ...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true })
};

export default knexConfig;