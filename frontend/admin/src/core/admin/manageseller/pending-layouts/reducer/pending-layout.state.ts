import { Map, Record } from 'immutable';

export interface PendingLayoutState extends Map<string, any> {

    // pendingLayoutsList //
    pendingLayoutsList: any;
    pendingLayoutsListLoading: boolean;
    pendingLayoutsListLoaded: boolean;
    pendingLayoutsListFailed: boolean;

   
}

export const PendingLayoutStateRecord = Record({

    // pendingLayoutsList /
    pendingLayoutsList: [],
    pendingLayoutsListLoading: false,
    pendingLayoutsListLoaded: false,
    pendingLayoutsListFailed: false,

   
});