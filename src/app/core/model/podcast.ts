import { Category, PodcastEntry, Notification } from '.';
import { Shareable } from './shareable';

export class Podcast extends Shareable {
    description?: string;
    slug?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    customDomain?: string;
    customRssDomain?: string;
    rssUrl?: string;
    pagesUrl?: string;
    createDate?: Date;
    podcastEntries?: PodcastEntry[];
    category?: Category;
    subcategories?: Array<Category>;
    notifications?: Array<Notification>;

    publicTitle?: string;
    facebookUrl?: string;
    twitterUrl?: string;

    private?: boolean;
    authUserName?: string;
    authPassword?: string;
}
