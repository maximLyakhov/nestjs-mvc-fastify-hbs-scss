import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { createClient, EntryCollection } from 'contentful';
import { contentfulCredentials } from '../../contentful.credentials';

interface Entry {
  title: string;
  description: string;
  image: any;
}

@Injectable()
export class ContentfulService {
  private client = createClient(contentfulCredentials);

  public getEntries(): Observable<any> {
    return this.getRequest('entry');
  }

  private getRequest(
    content_type: string,
  ): Observable<{ pageData: { entries: Entry[] } }> {
    const promise = this.client
      .getEntries({ params: { content_type } })
      .then((el: EntryCollection<Entry>) => ({
        pageData: {
          entries: this.mapLinkedContent(el),
        },
      }));
    return from(promise);
  }

  private mapLinkedContent(entries: EntryCollection<Entry>) {
    return entries.items.map((entry) => {
      if (entry.fields.image.length) {
        const imgUrl = entry.fields.image.find(Boolean).fields.file.url;
        const profilePicParams = '?fit=fill&w=280&h=280&r=3';
        entry.fields.image = `https:${imgUrl}${profilePicParams}`;
      }
      return entry.fields;
    });
  }
}
