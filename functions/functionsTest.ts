import {gql} from '@apollo/client';
// import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
// import {setContext} from '@apollo/client/link/context';
import fetch from 'cross-fetch';
import {client} from '../graphql/config';

// const accessHistory = {};

// const brandsHandler: Handler = async (event, context) => {
exports.handler = async (event, context) => {
    const TOKEN = process.env.REACT_APP_FUN_TOKEN;
    console.log('----> EVENT : ', event, 'BODY : ', event.body);
    console.log('----> CONTEXT : ', context);

    console.log('======> ORIGIN : ', event?.headers?.origin);
    /* TEST ACCESS CONTROL TOKEN HEADERS */
    if (event?.headers?.security !== TOKEN) {
        return {
            statusCode: 403,
            body: JSON.stringify({error: 'Access Forbiden'}),
        };
    }

    /* TEST RATE LIMITING */
    // if (accessHistory[event.headers['client-ip']] > Date.now() - 10 * 60 * 10) {
    //     return {
    //         statusCode: 429,
    //         body: JSON.stringify({error: 'Rate limit exceeded'}),
    //     };
    // }
    // accessHistory[event.headers['client-ip']] = Date.now();

    try {
        // const API_URI = process.env.REACT_APP_API_URI;
        const API_KEY = process.env.REACT_APP_API_KEY
            ? process.env.REACT_APP_API_KEY
            : '';
        console.log('API KEY : ', API_KEY);

        /**************** WITH APOLLO CLIENT ****************/
        // const httpLink = new HttpLink({
        //     uri: API_URI,
        //     fetch,
        // });
        // const authLink = setContext((_, {headers}) => {
        //     // get the authentication token from local storage if it exists
        //     const token = API_KEY;
        //     // return the headers to the context so httpLink can read them
        //     return {
        //         headers: {
        //             ...headers,
        //             authorization: token ? token : '',
        //         },
        //     };
        // });
        // const client = new ApolloClient({
        //     link: authLink.concat(httpLink),
        //     cache: new InMemoryCache(),
        // });

        const results = await client.query({
            query: gql`
                query {
                    getAllBrands {
                        id
                        name
                    }
                }
            `,
        });
        console.log(results);
        return {
            statusCode: 200,
            body: JSON.stringify({result: results?.data?.getAllBrands}),
        };
        /****************************************************/

        /**************** WITH FETCH ************************/
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'apikey');
        const res = await fetch(
            'https://motorbikes-api.herokuapp.com/graphql',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    query: `
                        query {
                            getAllBrands {
                                name
                            }
                          }
                    `,
                }),
            }
        );
        return {
            statusCode: 200,
            body: JSON.stringify({result: res}),
        };
        /****************************************************/
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed fetching'}),
        };
    }
};
// export {brandsHandler};
