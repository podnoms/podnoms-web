import { Action } from '@ngrx/store';
export type Reducer<T> = (state: T, action: Action) => T;
