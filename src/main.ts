import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  FastifyStaticOptions,
  PointOfViewOptions,
} from '@nestjs/platform-fastify/interfaces/external';
import { join } from 'path';
import { partials } from './partials';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const fastifyStaticOptions: FastifyStaticOptions = {
    root: join(__dirname, '..', 'public'),
    prefix: '/public',
  };
  app.useStaticAssets(fastifyStaticOptions);

  const pointOfViewOptions: PointOfViewOptions = {
    templates: join(__dirname, '..', 'views'),
    engine: {
      handlebars: require('handlebars'),
    },
    options: {
      partials,
    },
  };
  app.setViewEngine(pointOfViewOptions);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(8000);
}

const promise = bootstrap();
promise.then().catch(console.error);
