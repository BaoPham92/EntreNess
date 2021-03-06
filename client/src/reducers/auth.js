export default (state = {userId: undefined}, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                userId: action.userId
            }
        case 'LOG_OUT':
            return {}
        default:
            return state
    }
}