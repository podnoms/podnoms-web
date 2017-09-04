import { CustomAction } from './custom.action';
import { Action } from '@ngrx/store';
import { Reducer } from 'app/stores/reducer';
import { PodcastModel } from './../models/podcasts.models';
export const podcastsReducer: Reducer<PodcastModel[]> = (state: PodcastModel[] = [], action: CustomAction) => {
    switch (action.type) {
        case 'ADD_ITEMS':
            return action.payload;
        case 'CREATE_ITEM':
            return [...state, action.payload];
        case 'UPDATE_ITEM':
            return state.map(item => {
                return item.id == action.payload.id ? Object.assign({}, item, action.payload) : item;
            });
        case 'DELETE_ITEM':
            return state.filter(item => {
                return item.id != action.payload.id;
            });
        case 'FIND_ITEM':
            return state.filter(item => {
                return item.slug === action.payload;
            });
        default:
            return state;
    }
}
