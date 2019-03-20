import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRouter } from 'connected-react-router'
import thunk from 'redux-thunk'
import authReducer from '../reducers/auth'
import userReducer from '../reducers/users'
import reviewReducer from '../reducers/reviews'
import commentReducer from '../reducers/comments'
import { history } from '../routers/AppRouter'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            user: userReducer,
            review: reviewReducer,
            comment: commentReducer
        }),
        composeEnhancers(connectRouter(history), applyMiddleware(thunk))
    )

    return store
}
