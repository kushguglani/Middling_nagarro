import axios from 'axios';
import {
    BASEURL,
    LOGIN,
    REGISTRATION,
    // CURRENT_USER,
    UPDATE_USER,
    PROFILE,
    FOLLOW,
    // UNFOLLOW_USER,
    ARTICLES,
    // CREATE_ARTICLES,
    // UPDATE_ARTICLES,
    // DELETE_ARTICLES,
    // ADD_COOMENTS_ARTICLES,
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

export const fetchArticleBySlagService = (slagUrl,headers) => {
    return axios.get(`${BASEURL}${slagUrl}`,{headers})
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

export const fetchUserService =(headers,username) =>{
    return axios.get(`${BASEURL}${PROFILE}/${username}`, { headers })

}
