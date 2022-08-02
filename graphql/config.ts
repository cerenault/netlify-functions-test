import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {fetch} from 'cross-fetch';

const API_URI = process.env.REACT_APP_API_URI;
const API_KEY = process.env.REACT_APP_API_KEY;

const httpLink = createHttpLink({
    uri: API_URI,
    fetch,
});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = API_KEY;
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? token : '',
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
