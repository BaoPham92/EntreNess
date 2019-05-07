// Reducer for Posts

const postsDefaultState = {
    title: undefined,
    body: undefined,
    published: undefined
}

export default (state = postsDefaultState, action) => {
    switch(action.type) {
        case 'CREATE_POST': 
        return {
            ...state,
            ...action.postInfo
        }
        case 'UPDATE_POST': 
        return {
            ...state,
            ...action.postInfo
        }
        default: 
            return state
    }
}