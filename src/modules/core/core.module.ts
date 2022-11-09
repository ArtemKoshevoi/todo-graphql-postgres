import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { configSchema } from '../config/config.schema';
import { SharedModule } from '../shared/shared.module';
import { GqlConfigService } from './graphql/gql-config.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose/mongoose-config.service';

@Module({
  imports: [
    SharedModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: configSchema,
    }),
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
