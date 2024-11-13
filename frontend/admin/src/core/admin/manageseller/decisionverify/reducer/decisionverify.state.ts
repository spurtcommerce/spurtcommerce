import { Map, Record } from 'immutable';

export interface DecisionVerifyState extends Map<string, any> {

    // decisionVerifyList //
    decisionVerifyList: any;
    decisionVerifyListLoading: boolean;
    decisionVerifyListLoaded: boolean;
    decisionVerifyListFailed: boolean;

   
}

export const DecisionVerifyStateRecord = Record({

    // decisionVerifyList /
    decisionVerifyList: [],
    decisionVerifyListLoading: false,
    decisionVerifyListLoaded: false,
    decisionVerifyListFailed: false,

   
});
