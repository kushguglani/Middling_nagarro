import {
    userLoginService,
    userSignUpService,
    updateUser
    
} from '../../services/httpServices'


import { user_types } from '../type';

export function addUser(user) {
    return {
        type: user_types.ADD_USER,
        payload: user
    }
}
export function errorOnAddingUser(error) {
    return {
        type: user_types.USER_ERROR,
        payload: error
    }
}
export function errorOnUpdatingUser(error) {
    return {
        type: user_types.USER_UPDATE_ERROR,
        payload: error
    }
}
export function changeAdnin(admin) {
    return {
        type: user_types.CHANGE_ADMIN,
        payload: admin
    }
}



export const userLogin = (user) => {
    const userObject = { user }
    return dispatch => {
        userLoginService(userObject)
            .then(res => {
        
                dispatch(addUser(res.data.user))
            })
            .catch(err => {
                const errorCode = err.response.data.errors;
                const errorList = []
                for (const error in errorCode) {
                    errorList.push(`${error} ${errorCode[error]}`)
                }
                dispatch(errorOnAddingUser(errorList))
            })
    }
}

export const userSignup = (user) => {
    
    const userObject = { user }
    return dispatch => {
        userSignUpService(userObject)
            .then(res => {
        
                dispatch(addUser(res.data.user))
            })
            .catch(err => {
                const errorCode = err.response.data.errors;
                const errorList = []
                for (const error in errorCode) {
                    errorList.push(`${error} ${errorCode[error]}`)
                }
                dispatch(errorOnAddingUser(errorList))
            })

    }
}

export const changeActiveHeaderItem =(header)=>{
    return {
        type: user_types.CHANGE_HEADER,
        payload: header
    }
}

export const updateUserSettings = (header,user)=>{
    
    
    
    return dispatch => {
        updateUser(header,user)
        .then(res => {
            
            dispatch({
                type: user_types.UPDATE_USER_MESSAGE,
                payload: res.data
            })
        })
        .catch(err => {
            
            const errorCode = err.response.data.errors;
            const errorList = []
            for (const error in errorCode) {
                errorList.push(`${error} ${errorCode[error]}`)
            }
            
            dispatch(errorOnUpdatingUser(errorList))
        })
    }
}



export const logout =(header)=>{
    return {
        type: user_types.LOG_OUT,
        payload: header
    }
}
