import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Get port number
   */
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port || 8080);

  console.log(`Applistening on ${await app.getUrl()}`);
}
bootstrap();
