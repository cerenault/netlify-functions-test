exports.handler = async (event: any, context: any) => {
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'hello world'}),
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed fetching'}),
        };
    }
};
