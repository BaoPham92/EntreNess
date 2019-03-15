import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from "apollo-link-error"
import gql from 'graphql-tag'

import AppRouter from './src/routers/AppRouter'
import configureStore from './src/store/configureStore'

// https://www.apollographql.com/docs/react/recipes/authentication.html#Header \\
// Authentication for all requests.

// Prod & Dev environment links
// const httpLink = createHttpLink({ uri: 'https://infinite-earth-41172.herokuapp.com/' })
const httpLink = createHttpLink({ uri: 'http://localhost:4000/' })

// Caching.
const cache = new InMemoryCache()

const errorLink = onError(({operation, response, graphQLErrors, networkError}) => {
    console.groupCollapsed(`onError: `)
    if (operation)
        console.log(`[operation error]: ${JSON.stringify(operation, null, 2)}`)

    if (response)
        console.log(`[response error]: ${JSON.stringify(response, null, 2)}`)

    if (graphQLErrors)
        graphQLErrors.map(({message, locations, path}) => {
            console.log(`[graphQL error]: Message ${message}, Location: ${JSON.stringify(locations, null, 2)}, Path: ${path}`)
        if (message === 'jwt expired' || 'invalid signature') {
            return localStorage.removeItem('auth_token')
        }
    })

    if (networkError)
        console.log(`[Network error]: ${networkError}`)
    console.groupEnd()
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('auth_token')

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ``,
        }
    }
})

const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache
})

const store = configureStore()

const jsx = (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </ApolloProvider>
)

ReactDOM.render(jsx,document.getElementById('app'))