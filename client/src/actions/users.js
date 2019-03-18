export const createUser = (userInfo) => ({
    type: 'CREATE_USER',
    userInfo
})

export const updateUser = (userInfo) => ({
    type: 'UPDATE_USER',
    userInfo
})

export const startCreateUser = (userData) => {
    return (dispatch) => {

        if (userData.age) {
            userData.age = parseInt(userData.age, 10)
            dispatch(createUser({age: parseInt(userData.age, 10)}))
        }
        
        return dispatch(createUser(userData))
    }
}

export const startUpdateUser = () => {
    return (dispatch) => {
        // Update user data here.
    }
}