import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
    createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const API_URI = process.env.REACT_APP_API_URI;
const API_KEY = process.env.REACT_APP_API_KEY;

console.log('========> CREDENTIALS : ', API_KEY, API_URI);
const httpLink = createHttpLink({
    uri: API_URI,
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

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

console.log('CLIENT : ', client);
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

client
    .query({
        query: gql`
            query {
                getAllBrands {
                    name
                }
            }
        `,
    })
    .then((e) => console.log('res : ', e));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
