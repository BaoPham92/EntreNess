export const createPost = (postInfo) => ({
    type: 'CREATE_POST',
    postInfo
})

export const startCreatePost = (postData) => {
    return (dispatch) => {
        return dispatch(createPost(postData))
    }
}

export const updatePost = (postInfo) => ({
    type: 'UPDATE_POST',
    postInfo
})

export const startUpdatePost = (postData) => {
    return (dispatch) => {
        return dispatch(updatePost(postData))
    }
}