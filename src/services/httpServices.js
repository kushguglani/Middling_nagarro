import axios from 'axios';
import {
    BASEURL,
    LOGIN,
    REGISTRATION,
    FEED,
    UPDATE_USER,
    PROFILE,
    FOLLOW,
    ARTICLES,
    GET_TAGS
} from '../utils/apiConstants';
export const userLoginService = (user) => {
    return axios.post(`${BASEURL}${LOGIN}`, user);
}
export const userSignUpService = (user) => {
    return axios.post(`${BASEURL}${REGISTRATION}`, user);
}

export const fetchfeedsService = (val, headers) => {


    return axios.get(`${BASEURL}${ARTICLES}?offset=${val}`, { headers });
}

export const fetchTagsService = () => {
    return axios.get(`${BASEURL}${GET_TAGS}`)
}

export const fetchConditionalFeedsService = (by, tag, val, headers) => {


    return axios.get(`${BASEURL}${ARTICLES}?${by}=${tag}&offset=${val}`, { headers })
}

export const publishArticle = (headers, data) => {
    return axios.post(`${BASEURL}${ARTICLES}`, data, { headers })
}
export const editArticleService = (headers, data,slug) => {
    
    return axios.put(`${BASEURL}${ARTICLES}/${slug}`, data, { headers })
}
export const updateUser = (headers, data) => {
    return axios.put(`${BASEURL}${UPDATE_USER}`, data, { headers })
}

export const favoriteArticleService = (headers, slug, method) => {
    return axios({
        method,
        url: `${BASEURL}${ARTICLES}/${slug}/favorite`,
        headers,
        data: ""
    })
}

export const followUserService = (headers, user, method) => {
    return axios({
        method,
        url: `${BASEURL}${PROFILE}/${user}${FOLLOW}`,
        headers,
        data: ""
    })
}

export const fetchArticleBySlagService = (slagUrl, headers) => {
    return axios.get(`${BASEURL}${slagUrl}`, { headers })
}

export const fetchCommnetsBySlagService = (slagUrl) => {
    return axios.get(`${BASEURL}${slagUrl}`)
}


export const addCommentToArticleService = (slagUrl, body, headers) => {


    return axios.post(`${BASEURL}${slagUrl}`, body, { headers })
}

export const deleteCommentToArticleService = (slagUrl, id, headers) => {



    return axios.delete(`${BASEURL}${slagUrl}/${id}`, { headers })
}

export const fetchUserService = (headers, username) => {
    return axios.get(`${BASEURL}${PROFILE}/${username}`, { headers })
}

export const fetchFollowedFeedsService = (val, headers) => {
    return axios.get(`${BASEURL}${ARTICLES}${FEED}?offset=${val}`, { headers })
}

export const deleteArticleService = (slug, headers) => {
    return axios.delete(`${BASEURL}${ARTICLES}/${slug}`, { headers })
}