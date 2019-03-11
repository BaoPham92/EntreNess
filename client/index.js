import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/components/App'
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import gql from 'graphql-tag'

// https://www.apollographql.com/docs/react/recipes/authentication.html#Header \\
// Authentication for all requests.
const httpLink = createHttpLink({ uri: 'https://infinite-earth-41172.herokuapp.com/' })

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('auth_token')

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
,document.getElementById('app'))