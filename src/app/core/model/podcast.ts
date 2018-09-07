import { Category, PodcastEntry, Notification } from '.';

export class Podcast {
    id?: string;
    title: string;
    description?: string;
    slug?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    customDomain?: string;
    rssUrl?: string;
    createDate?: Date;
    podcastEntries?: PodcastEntry[];
    category?: Category;
    subcategories?: Array<Category>;
    notifications?: Array<Notification>;
}
