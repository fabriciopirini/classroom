import path from 'path';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from '../database/database.module';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { CoursesService } from '../services/courses.service';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentsService } from '../services/students.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    CoursesResolver,
    StudentsResolver,
    EnrollmentsResolver,

    // Services
    CoursesService,
    StudentsService,
    EnrollmentsService,
  ],
})
export class HttpModule {}
