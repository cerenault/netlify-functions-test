import {gql} from '@apollo/client';
import {client} from '../src/index';

exports.handler = async (event: any, context: any) => {
    console.log('client : ', client);
    try {
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
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed fetching'}),
        };
    }
};
