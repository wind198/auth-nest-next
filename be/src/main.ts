import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  /**
   * create app and enable cors, remember that origins do not have traling slash
   */
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:4000',
      credentials: true,
    },
  });

  /**
   * Get port number
   */
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.setGlobalPrefix('api');

  await app.listen(port || 8080);

  console.log(`Applistening on ${await app.getUrl()}`);
}
bootstrap();
