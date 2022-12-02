import { Module } from '@nestjs/common';
import { postgreDatabaseProviders } from './postgre-database.providers';

@Module({
  providers: [...postgreDatabaseProviders],
  exports: [...postgreDatabaseProviders],
})
export class PostgreDatabaseModule {}
