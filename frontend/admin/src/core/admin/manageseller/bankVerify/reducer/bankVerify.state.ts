import { Map, Record } from 'immutable';

export interface BankVerifyState extends Map<string, any> {
    bankVerifyList: any;
    bankVerifyListLoading: boolean;
    bankVerifyListLoaded: boolean;
    bankVerifyListFailed: boolean;

    //bankVerifyChecked
    bankVerifyChecked: any;
    bankVerifyCheckedLoading: boolean;
    bankVerifyCheckedLoaded: boolean;
    bankVerifyCheckedFailed: boolean;
}

export const BankVerifyStateRecord = Record({
    bankVerifyList: [],
    bankVerifyListLoading: false,
    bankVerifyListLoaded: false,
    bankVerifyListFailed: false,

    //bankVerifyChecked
    bankVerifyChecked: [],
    bankVerifyCheckedLoading: false,
    bankVerifyCheckedLoaded: false,
    bankVerifyCheckedFailed: false,

});