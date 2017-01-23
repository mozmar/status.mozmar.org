import serviceDetail from '../../reducers/serviceDetail';

import { defaultServiceDetailData} from '../../helpers';

import {
    REQUEST_SERVICE_DETAIL,
    RECEIVE_SERVICE_DETAIL,
    RESET_SERVICE_DETAIL } from '../../actions/actionCreators';


const newData = {
    alerts: [{}, {}, {}],
    lastUpdate: 'test last update',
    message: 'test message'
};

describe('serviceDetail reducer', () => {
    test('it should handle REQUEST_SERVICE_DETAIL', () => {
        expect(serviceDetail({}, { type: REQUEST_SERVICE_DETAIL })).toEqual({
            isUpdating: true
        });
    });

    test('it should handle RECEIVE_SERVICE_DETAIL', () => {
        const expectedResult = {
            alerts: [{}, {}, {}],
            isUpdating: false,
            lastUpdate: 'test last update',
            message: 'test message'
        }

        expect(serviceDetail(defaultServiceDetailData, {
            type: RECEIVE_SERVICE_DETAIL,
            data: newData
        })).toEqual(expectedResult);
    });

    test('it should handle RESET_SERVICE_DETAIL', () => {
        expect(serviceDetail(newData, {
            type: RESET_SERVICE_DETAIL
        })).toEqual(defaultServiceDetailData);
    });
});
