import {gql} from '@apollo/client';
import {client} from './config';

export const fetchBrands = async () => {
    const res = await client.query({
        query: gql`
            query {
                getAllBrands {
                    name
                }
            }
        `,
    });
    if (res?.data?.getAllBrands) return res.data.getAllBrands;
    return null;
};
