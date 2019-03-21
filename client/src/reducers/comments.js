// Reducer for Comments

const commentsDefaultState = {
    review: undefined,
    text: undefined
}

export default (state = commentsDefaultState, action) => {
    switch(action.type) {
        case 'CREATE_COMMENT':
        return {
            ...state,
            ...action.commentInfo
        }
        case 'UPDATE_COMMENT': 
        return {
            ...state,
            ...action.commentInfo
        }
        default:
            return state
    }
}