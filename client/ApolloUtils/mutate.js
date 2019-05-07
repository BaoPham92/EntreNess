import { QueryPosts } from '../src/queries/Posts'
import { UsersQuery, UserProfileQuery } from '../src/queries/Users'

export const refetchQueries = [
    {query: 'QueryPosts'},
    {query: 'UsersQuery'},
    {query: 'UserProfileQuery'}
]