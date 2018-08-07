import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'videofilter'
})
export class VideoFilterPipe implements PipeTransform {
  transform(items: any[], key: string): any[] {
    if(!items) return [];
    if(!key) return items;
    key = key.toLowerCase();
    return items.filter( it => {
      return it.videotitle.toLowerCase().includes(key);
    });
  }
}