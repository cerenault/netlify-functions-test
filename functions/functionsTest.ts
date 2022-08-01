import {fetchBrands} from '../graphql/query';

exports.handler = async (event: any, context: any) => {
    try {
        const res = await fetchBrands();
        return {
            statusCode: 200,
            body: JSON.stringify({result: res}),
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed fetching'}),
        };
    }
};
