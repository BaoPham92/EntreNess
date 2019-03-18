// Reducer for Users

const usersDefaultState = {
    name: undefined,
    email: undefined,
    contactNumber: undefined,
    age: undefined,
    password: undefined
}

export default (state = usersDefaultState, action) => {
    switch (action.type) {
        case 'CREATE_USER':
            return {
                ...state,
                ...action.userInfo
            }
        case 'UPDATE_USER':
        return {
            ...state,
            ...action.userInfo
        }
        default:
            return state
    }
}