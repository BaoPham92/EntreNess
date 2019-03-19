// Reducer for Reviews

const reviewsDefaultState = {
    title: undefined,
    body: undefined,
    experience: undefined,
    published: undefined
}

export default (state = reviewsDefaultState, action) => {
    switch(action.type) {
        case 'CREATE_REVIEW': 
        return {
            ...state,
            ...action.reviewInfo
        }
        default: 
            return state
    }
}