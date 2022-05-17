import {
  Controller,
  Get,
  Header,
  Param,
  Render,
  StreamableFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ContentfulService } from './contentful/contentful.service';
import { Observable } from 'rxjs';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cfService: ContentfulService,
  ) {}

  @Get()
  @Render('index')
  index(): Observable<any> {
    return this.cfService.getEntries();
  }

  @Get('favicon.ico')
  favicon(): StreamableFile {
    return this.file('public/favicon.ico');
  }

  @Header('Content-Type', 'text/css')
  @Get('public/:filename')
  css(@Param('filename') filename: string): StreamableFile {
    return this.file('public/styles/' + filename);
  }

  private file = (path: string): StreamableFile => {
    console.log('lol');
    const file = createReadStream(join(process.cwd(), path));
    return new StreamableFile(file);
  };
}
