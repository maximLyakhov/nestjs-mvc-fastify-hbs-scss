import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentfulModule } from './contentful/contentful.module';

@Module({
  imports: [ContentfulModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
