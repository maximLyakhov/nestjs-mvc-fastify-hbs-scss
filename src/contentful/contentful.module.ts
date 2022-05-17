import { Module } from '@nestjs/common';
import { ContentfulService } from './contentful.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ContentfulService],
  exports: [ContentfulService],
})
export class ContentfulModule {}
