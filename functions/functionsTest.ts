import {ApolloClient, InMemoryCache, createHttpLink, gql} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

exports.handler = async (event: any, context: any) => {
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

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
    try {
        const res = await client.query({
            query: gql`
                query {
                    getAllBrands {
                        name
                    }
                }
            `,
        });
        return {
            statusCode: 200,
            body: JSON.stringify({message: res.data.getAllBrands}),
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed fetching'}),
        };
    }
};
