const InitialStore = {
    error: [],
    user: {},
    isUserLogin: false,
    activeHeaderItem: "home",
    updateUserMsz: [],
    loginPage:false
}

export default function user(store = InitialStore, action) {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...store,
                user: action.payload,
                error: [],
                isUserLogin: true,
                activeHeaderItem: "home",
                loginPage:false
            }
        case 'USER_ERROR':
            return {
                ...store,
                error: action.payload,
                isUserLogin: false,
                user: {},
                loginPage:false
            }
        case 'USER_UPDATE_ERROR':
            return {
                ...store,
                updateUserMsz: action.payload,
                loginPage:false
            }
        case 'CHANGE_HEADER':
            return {
                ...store,
                activeHeaderItem: action.payload,
                loginPage:false
            }
        case 'UPDATE_USER_MESSAGE':
            return {
                ...store,
                updateUserMsz: ["User Updated"],
                user: { ...store.user, ...action.payload.user }
            }
        case 'LOG_OUT':
            return {
                error: [],
                user: {},
                isUserLogin: false,
                activeHeaderItem: "home",
                updateUserMsz: [],
                loginPage:true
            }

        default:
            return store;
    }
}