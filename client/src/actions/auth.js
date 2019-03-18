import decode from 'jwt-decode'
import { history } from '../routers/AppRouter'

export const login = (userId) => ({
    type: 'LOG_IN',
    userId
})

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('auth_token')
        dispatch({type: 'LOG_OUT'})
    }
}

export const checkAuth = () => {
    return (dispatch) => {
        try {
            const token = localStorage.getItem('auth_token')
            const decoded = decode(token)
            const result = !!token && !(decoded.exp < Date.now() / 1000)
            
            if (result) {
                dispatch(login(decoded.userId))
                history.replace('/DashBoard')
            }
        
        } catch(e) {
            return dispatch(logout())
        }
    }
}