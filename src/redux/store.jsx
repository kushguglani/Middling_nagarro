import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // localStorage
import storage from "redux-persist/lib/storage/session"; // session Storage
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { rootReducer } from './reducer/combineReducer';

const config = {
    key: 'root',
    storage,
    // whitelist:['adminName']
}

const persistedReducer = persistReducer(config, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk,logger));
export const persistor = persistStore(store);