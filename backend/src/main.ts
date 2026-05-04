import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/app.router';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  console.log('[ENV] DATABASE_DIALECT:', process.env.DATABASE_DIALECT);
  console.log('[ENV] DATABASE_HOST:', process.env.DATABASE_HOST);
  console.log('[ENV] DATABASE_NAME:', process.env.DATABASE_NAME);
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });

  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  const trpcRouter = app.get(TrpcRouter);
  const seedService = app.get(SeedService);

  app.getHttpAdapter().use(
    '/trpc',
    createExpressMiddleware({
      router: trpcRouter.appRouter,
      createContext: ({ req }) => ({ req }),
    }),
  );

  await app.init();

  // await seedService.seed(); // disabled for sequelize-cli seeders

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/trpc`);
}

bootstrap();
