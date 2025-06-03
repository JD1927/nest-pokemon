import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'; // Package from node
import appConfig from './config/app.config';
import { CommonModule } from './common/common.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';
import { JoiValidationSchema } from './config/joi-validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: JoiValidationSchema,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(process.env.MONGO_DB || '', {
      dbName: process.env.MONGO_DB_NAME || '',
    }),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
