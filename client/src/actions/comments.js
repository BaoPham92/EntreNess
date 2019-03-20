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