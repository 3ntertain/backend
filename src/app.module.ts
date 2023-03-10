import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModesModule } from './modes/modes.module';
import { SettingsModule } from './settings/settings.module';
import { ConfigModule } from '@nestjs/config';
import { PricingsModule } from './pricings/pricings.module';
import { HappeningsModule } from './happenings/happenings.module';
import { UploadModule } from './upload/upload.module';
import { UploadService } from './upload/upload.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      cache: new InMemoryLRUCache(),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GamesModule,
    ModesModule,
    SettingsModule,
    PricingsModule,
    HappeningsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, UploadService],
})
export class AppModule {}
