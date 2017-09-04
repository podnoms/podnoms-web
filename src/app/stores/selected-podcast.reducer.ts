import { CustomAction } from './custom.action';
import { Action } from '@ngrx/store';
import { PodcastModel } from './../models/podcasts.models';
import { Reducer } from 'app/stores/reducer';
export const selectedPodcastReducer: Reducer<PodcastModel> = (state: PodcastModel = null, action: CustomAction) => {
    switch (action.type) {
        case 'SELECT_ITEM':
            return action.payload;
        default:
            return state;
    }
};
