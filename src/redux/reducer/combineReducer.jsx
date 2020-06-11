import { combineReducers } from 'redux';
import user from './user';
import { userFeeds } from './feeds';

export const rootReducer = combineReducers({ user, userFeeds })