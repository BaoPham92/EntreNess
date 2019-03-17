export const createUser = (userInfo) => ({
    type: 'CREATE_USER',
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
