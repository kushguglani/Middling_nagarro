import { feed_types } from '../type';
import { user_types } from '../type';

const InitailStore = {
    feeds: [],
    tags: [],
    feedLoader: true,
    tagLoader: true,
    selectedTag: "",
    activeTab: "globalFeed",
    redirectTo: "",
    articlesCount: 0,
    tempFeed: [],
    searchValue: "",
    editArticle: "",
    editedArticle: { edited: "" }

}

export const userFeeds = (store = InitailStore, action) => {
    switch (action.type) {
        case feed_types.FETCH_FEEDS: {
            return {
                ...store,
                feeds: action.payload,
                tempFeed: action.payload,
                feedLoader: false,
                redirectTo: "",
                articlesCount: action.articlesCount,
                searchValue: ""
            }
        }
        case feed_types.FETCH_TAGS: {
            return {
                ...store,
                tags: action.payload,
                tagLoader: false,
            }
        }
        case feed_types.SELECTED_TAG: {
            return {
                ...store,
                selectedTag: action.payload,
                activeIndex: "1"
            }
        }
        case feed_types.START_LOADER: {
            return {
                ...store,
                [action.payload]: true
            }
        }
        case feed_types.CHANGE_ACTIVE_TAB: {
            return {
                ...store,
                activeTab: action.payload
            }
        }
        case feed_types.REDIRECT_TO: {
            return {
                ...store,
                redirectTo: action.payload
            }
        }
        case feed_types.EDIT_FEEDS: {
            const feeds = store.feeds.map(function (obj) {
                if (obj.slug === action.payload.slug) {
                    obj.favorited = action.payload.favorited;
                    obj.favoritesCount = action.payload.favoritesCount
                    return obj
                } else {
                    return obj;
                }
            });

            return {
                ...store,
                feeds,
                tempFeed: feeds,
            }
        }
        case feed_types.SEARCH_FEEDS: {
            const feeds = store.tempFeed.filter(curr => {
                return curr.title.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
            })
            return {
                ...store,
                feeds,
                searchValue: action.payload
            }
        }
        case feed_types.EDIT_ARTICLE: {
            return {
                ...store,
                editArticle: action.payload,
                editedArticle: { edited: "" }
            }
        }

        case feed_types.EDITED_ARTICLE: {
            return {
                ...store,
                editArticle: "",
                editedArticle: { edited: "done" }
            }
        }
        case user_types.CHANGE_HEADER: {
            return {
                ...store,
                editArticle: "",
                editedArticle: { edited: "" }
            }
        }
        case user_types.LOG_OUT: {
            return {
                feeds: [],
                tags: [],
                feedLoader: true,
                tagLoader: true,
                selectedTag: "",
                activeTab: "globalFeed",
                redirectTo: "",
                articlesCount: 0,
                tempFeed: [],
                searchValue: "",
                editArticle: "",
                editedArticle: { edited: "" }
            }
        }
        default:
            return store
    }

}
