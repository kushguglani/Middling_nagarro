import {
    fetchfeedsService,
    fetchTagsService,
    fetchConditionalFeedsService,
    publishArticle,
    favoriteArticleService,
    fetchArticleBySlagService,
    fetchCommnetsBySlagService,
    addCommentToArticleService,
    deleteCommentToArticleService,
    followUserService,
    fetchUserService
} from '../../services/httpServices'
import { feed_types } from '../type';

export const fetchFeeds = (val, header = {}) => {
    return dispatch => {

        dispatch(changeActiveTab("globalFeed"))
        dispatch(startSpinner("feedLoader"))
        fetchfeedsService(val, header).then(res => {
            dispatch({
                type: feed_types.FETCH_FEEDS,
                payload: res.data.articles,
                articlesCount: res.data.articlesCount
            })
        })
            .catch(err => {
            })
    }
}

export const fetchTags = () => {
    return dispatch => {
        fetchTagsService().then(res => {
            dispatch({
                type: feed_types.FETCH_TAGS,
                payload: res.data.tags
            })
        })
            .catch(err => {
            })
    }
}

export const changeActiveTab = (tab) => {

    return {
        type: feed_types.CHANGE_ACTIVE_TAB,
        payload: tab
    };
}

export const fetchConditionalFeeds = (by, tag, val = 0, header = {}) => {
    return dispatch => {
        by === "tag" && dispatch(addSelectedTag(tag))
        dispatch(startSpinner("feedLoader"))
        dispatch(changeActiveTab(by))
        fetchConditionalFeedsService(by, tag, val, header).then(res => {
            dispatch({
                type: feed_types.FETCH_FEEDS,
                payload: res.data.articles,
                articlesCount: res.data.articlesCount
            })
        })
            .catch(err => {
                return err
            })
    }
}
export const addSelectedTag = (tag) => {

    return {
        type: feed_types.SELECTED_TAG,
        payload: tag
    };
}

export const startSpinner = (loader) => {
    return {
        type: feed_types.START_LOADER,
        payload: loader
    };
}
export const redirect = (to) => {
    return {
        type: feed_types.REDIRECT_TO,
        payload: to
    };
}
export const apiError = (err) => {
    return {
        type: feed_types.API_ERROR,
        payload: err
    };
}
export const createArticle = (articles, headers, user) => {

    // return 
    return dispatch => {
        publishArticle(headers, articles).then(res => {
            dispatch(fetchConditionalFeeds("author", user))
            dispatch(redirect("/"))
        })
            .catch(error => {
                dispatch(apiError({ error: error.response.data }));
            })
    }
}

export const favoriteArticle = (header, slug, method) => {

    return dispatch => {
        favoriteArticleService(header, slug, method).then(res => {


            dispatch({
                type: feed_types.EDIT_FEEDS,
                payload: res.data.article
            })

        })
            .catch(err => {

                const errorCode = err.response;

                const errorList = []
                for (const error in errorCode) {
                    errorList.push(`${error} ${errorCode[error]}`)
                }

                // dispatch(errorOnUpdatingUser(errorList))
            })
    }

}

export const fetchArticleBySlag = (slagUrl, headers) => {
    return fetchArticleBySlagService(slagUrl, headers)
    // .then(res => {
    //     
    //     return res.data.article;
    // })
}

export const fetchCommnetsBySlag = (slagUrl) => {
    return fetchCommnetsBySlagService(slagUrl)
}

export const addCommentToArticle = (slagUrl, body, header) => {

    return addCommentToArticleService(slagUrl, body, header)
}
export const deleteCommentToArticle = (slagUrl, id, header) => {



    return deleteCommentToArticleService(slagUrl, id, header)
}

export const inputSearch = (data) => {
    return {
        type: feed_types.SEARCH_FEEDS,
        payload: data
    };
}
export const favoriteArticleFeedPage = (header, slug, method) => {

    return favoriteArticleService(header, slug, method)
}


export const followUser = (header, user, method) => {
    return followUserService(header, user, method)
}

export const fetchUser = (header, username) => {
    return fetchUserService(header, username)
}


