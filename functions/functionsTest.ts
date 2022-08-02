import {gql, ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import fetch from 'cross-fetch';

// const brandsHandler: Handler = async (event, context) => {
exports.handler = async (event, context) => {
    const apiUri = process.env.REACT_APP_API_URI;
    const apiKey = process.env.REACT_APP_API_KEY;
    try {
        /**************** WITH APOLLO CLIENT ****************/
        const client = new ApolloClient({
            link: new HttpLink({uri: apiUri, fetch}),
            cache: new InMemoryCache(),
            headers: {
                authorization: apiKey ? apiKey : '',
            },
        });
        const results = await client.query({
            query: gql`
                query {
                    getAllBrands {
                        name
                    }
                }
            `,
        });
        console.log(results);
        return {
            statusCode: 200,
            body: JSON.stringify({result: results}),
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
