export const createReview = (reviewInfo) => ({
    type: 'CREATE_REVIEW',
    reviewInfo
})

export const startCreateReview = (reviewData) => {
    return (dispatch) => {
        return dispatch(createReview(reviewData))
    }
}