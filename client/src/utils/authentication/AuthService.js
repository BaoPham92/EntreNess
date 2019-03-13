import decode from 'jwt-decode'

export default class AuthService {

    constructor(domain) {
        domain = domain || 'http://localhost:4000/'
    }

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExp(token)
    }

    // Check if token expired
    isTokenExp = (token) => {
        try {
            const decoded = decode(token)

            if (decoded.exp < Date.now() / 1000 ) {
                return true
            } else {
                return false
            }

        } catch (e) {
            console.log(e)
            return false
        }
    }

    setToken = (authData) => {
        // Saves user token to localStorage
        localStorage.setItem('auth_token', authData)
    }

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('auth_token')
    }

    logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('auth_token')
    }

    getProfile = () => {
        // Using jwt-decode npm package to decode the token
        const decoded = decode(this.getToken())

        return decoded
    }
}