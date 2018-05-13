import { Pipe, PipeTransform } from '@angular/core';
import { PodcastEntryModel } from '../models/podcasts.models';

@Pipe({
    name: 'filterEntry',
    pure: false
})
export class FilterEntryPipe implements PipeTransform {
    transform(items: PodcastEntryModel[], ...args: any[]): PodcastEntryModel[] {
        if (items == null) {
            return items;
        }
        return items.filter(item => item.processingStatus === args[0]);
    }
}
