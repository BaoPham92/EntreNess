export const createReview = (reviewInfo) => ({
    type: 'CREATE_REVIEW',
    reviewInfo
})

export const startCreateReview = (reviewData) => {
    return (dispatch) => {
        return dispatch(createReview(reviewData))
    }
}

export const updateReview = (reviewInfo) => ({
    type: 'CREATE_REVIEW',
    reviewInfo
})

export const startUpdateReview = (reviewData) => {
    return (dispatch) => {
        return dispatch(updateReview(reviewData))
    }
}