import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { defineConfig } from '@mikro-orm/postgresql';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const logger = new Logger('MikroORM');

export default defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: process.env.DB_NAME || 'myapp_database',
  driver: PostgreSqlDriver,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USERNAME || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD || '0005',
  // Use DATABASE_URL for Railway deployment
  clientUrl: process.env.DATABASE_URL,
  highlighter: new SqlHighlighter(),
  debug: process.env.NODE_ENV !== 'production',
  logger: logger.log.bind(logger),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    glob: '!(*.d).{js,ts}',   // 👈 regex hatao, glob lagao
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: true,
    emit: 'ts',
  },
});