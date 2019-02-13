/**
 * Hero-oriented InMemoryDbService with method overrides.
 */
import { Injectable } from '@angular/core';

import { RequestInfo, RequestInfoUtilities, ParsedRequestUrl } from 'angular-in-memory-web-api';

import { Podcast } from './model';

/** In-memory database data */
interface Db {
    [collectionName: string]: any[];
}

@Injectable()
export class InMemoryDataService {
    /** True if in-mem service is intercepting; all requests pass thru when false. */
    active = true;
    maxId = 0;

    /** In-memory database data */
    db: Db = {};

    /** Create the in-memory database on start or by command */
    createDb(reqInfo?: RequestInfo) {
        this.db = getDbData();

        if (reqInfo) {
            const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
            if (body.clear === true) {
                // tslint:disable-next-line:forin
                for (const coll in this.db) {
                    this.db[coll].length = 0;
                }
            }

            this.active = !!body.active;
        }
        return this.db;
    }

    /**
     * Simulate generating new Id on the server
     * All collections in this db have numeric ids.
     * Seed grows by highest id seen in any of the collections.
     */
    genId(collection: { id: number }[], collectionName: string) {
        this.maxId =
            1 + collection.reduce((prev, cur) => Math.max(prev, cur.id || 0), this.maxId);
        return this.maxId;
    }

    /**
     * Override `parseRequestUrl`
     * Manipulates the request URL or the parsed result.
     * If in-mem is inactive, clear collectionName so that service passes request thru.
     * If in-mem is active, after parsing with the default parser,
     * @param url from request URL
     * @param utils for manipulating parsed URL
     */
    parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
        const parsed = utils.parseRequestUrl(url);
        const isDefaultRoot = parsed.apiBase === 'api/';
        parsed.collectionName =
            this.active && isDefaultRoot ? mapCollectionName(parsed.collectionName) : undefined;
        return parsed;
    }
}
function mapCollectionName(name: string): string {
    return (
        ({
            podcast: 'podcasts'
        } as any)[name] || name
    );
}

/**
 * Development data
 */
function getDbData() {
    const podcasts: Podcast[] = [
        // {
        //     title: 'Social',
        //     description: null,
        //     thumbnailUrl: 'http://placebeard.it/128/128?1',
        //     slug: 'social',
        //     id: 1
        // },
        // {
        //     title: 'Audio Books',
        //     description: null,
        //     thumbnailUrl: 'http://placebeard.it/128/128?2',
        //     slug: 'audio-books',
        //     id: 2
        // },
        {
            title: 'Technology',
            description: null,
            thumbnailUrl: 'http://placebeard.it/128/128?3',
            slug: 'technology',
            id: 'technology'
        },
        {
            title: 'Comedy',
            description: null,
            thumbnailUrl: 'http://placebeard.it/128/128?4',
            slug: 'comedy',
            id: 'comedy'
        },
        {
            title: 'Music',
            description: null,
            thumbnailUrl: 'http://placebeard.it/128/128?5',
            slug: 'music',
            id: 'music'
        },
        {
            title: 'Science',
            description: null,
            thumbnailUrl: 'http://placebeard.it/128/128?6',
            slug: 'science',
            id: 'science'
        },
        {
            title: 'Test',
            description: null,
            thumbnailUrl: 'http://placebeard.it/128/128?7',
            slug: 'test-1',
            id: 'test-1'
        }
    ];
    return { podcasts } as Db;
}
