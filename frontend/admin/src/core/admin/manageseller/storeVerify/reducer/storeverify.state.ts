import { Map, Record } from 'immutable';

export interface StoreVerifyState extends Map<string, any> {

    // storeverifyList //
    storeverifyList: any;
    storeverifyListLoading: boolean;
    storeverifyListLoaded: boolean;
    storeverifyListFailed: boolean;


    // storeverify //
    storeverify: any;
    storeverifyLoading: boolean;
    storeverifyLoaded: boolean;
    storeverifyFailed: boolean;


}

export const StoreVerifyStateRecord = Record({

    // storeverifyList /
    storeverifyList: [],
    storeverifyListLoading: false,
    storeverifyListLoaded: false,
    storeverifyListFailed: false,

    // storeverify /
    storeverify: [],
    storeverifyLoading: false,
    storeverifyLoaded: false,
    storeverifyFailed: false,


});
