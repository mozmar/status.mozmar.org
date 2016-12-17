/*
Reducers for actions related to serviceDetail state data.
*/

import {
    REQUEST_SERVICE_DETAIL,
    RECEIVE_SERVICE_DETAIL,
    RESET_SERVICE_DETAIL } from '../actions/actionCreators';

function serviceDetail(serviceState = {}, action) {
    let newServiceState;

    switch (action.type) {
        case REQUEST_SERVICE_DETAIL:
            // Take everything currently in state.serviceDetail and put in in a
            // new object. Then overwrite that with values provided last -
            // namely changing 'isUpdating' to true.
            newServiceState = Object.assign({}, serviceState, {
                isUpdating: true
            });

            break;
        case RECEIVE_SERVICE_DETAIL:
            newServiceState = Object.assign({}, serviceState, {
                alerts: action.data.alerts,
                isUpdating: false,
                lastUpdate: action.data.lastUpdate,
                message: action.data.message
            });

            break;
        case RESET_SERVICE_DETAIL:
            newServiceState = {
                alerts: [],
                isUpdating: false,
                lastUpdate: null,
                message: 'Fetching data...'
            };

            break;
        // You gotta return something..
        default:
            newServiceState = serviceState;
            break;
    }

    return newServiceState;
}

export default serviceDetail;
