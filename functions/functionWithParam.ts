import {gql} from '@apollo/client';
import {client} from '../graphql/config';

exports.handler = async (event, context) => {
    const URI_ORIGIN = process.env.REACT_APP_URI_ORIGIN;
    if (event.headers['referer'] !== URI_ORIGIN) {
        return {
            statusCode: 403,
            body: JSON.stringify({error: 'Access forbidden'}),
        };
    }
    try {
        const id = event.queryStringParameters.id;
        if (!id) {
            return {
                statusCode: 500,
                body: JSON.stringify({error: 'Invalid id'}),
            };
        }

        const result = await client.query({
            query: gql`
                query getMotorbikes(
                    $brandsIds: [String!]
                    $displacements: [Int!]
                ) {
                    getAllMotorbikes(
                        brandsIds: $brandsIds
                        displacements: $displacements
                    ) {
                        motorbikes {
                            id
                            model
                            displacement
                        }
                    }
                }
            `,
            variables: {brandsIds: [id!]},
        });
        console.log(result);
        return {
            statusCode: 200,
            body: JSON.stringify({
                result: result?.data?.getAllMotorbikes?.motorbikes,
            }),
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Error fetching'}),
        };
    }
};
