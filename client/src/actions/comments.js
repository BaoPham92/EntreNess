export const createComment = (commentInfo) => ({
    type: 'CREATE_COMMENT',
    commentInfo
})

export const startCreateComment = (commentData) => {
    return (disptach) => {
        if (commentData) {
            return disptach(createComment(commentData))
        }
    }
}

export const updateComment = (commentInfo) => ({
    type: 'UPDATE_COMMENT',
    commentInfo
})

export const startUpdateComment = (commentData) => {
    return (disptach) => {
        if (commentData) {
            return disptach(updateComment(commentData))
        }
    }
}