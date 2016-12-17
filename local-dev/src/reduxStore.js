import { browserHistory } from 'react-router';
// allows sync between react-router and redux store
import { syncHistoryWithStore } from 'react-router-redux';

import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
// for async reducers
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/index';

import { defaultGlobalData, defaultServiceDetailData } from './helpers';

const loggerMiddleware = createLogger();

const defaultState = {
    global: defaultGlobalData,
    serviceDetail: defaultServiceDetailData
}

const store = createStore(
    rootReducer,
    defaultState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware)
);

export const history = syncHistoryWithStore(browserHistory, store);

// hot reload reducers
if (module.hot) {
    module.hot.accept('./reducers/', () => {
        // cannot import inside a function - must use 'require' instead
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
